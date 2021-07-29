import { readJSON, pathExists, readFile } from 'fs-extra';
import Bluebird from 'bluebird';
import { ITSResolvable } from 'ts-type';
import { saveFile, saveJSON, checkStat, isOutdated, updateStat } from './lib/fs';
import { handleOptions } from './lib/util';

export interface IOptionsGetLocalOrRebuild<T = any>
{
	statFile?: string;
	ttl?: number,
	force?: boolean,

	makeFns?: ((targetFile: string, options: IOptionsGetLocalOrRebuild<T>) => ITSResolvable<T>)[];

	fallback?: {
		module?: string,
	},

	validFn?(data: unknown): asserts data is T,

	console?: Console,

	rawFile?: boolean,
}

export function getLocalOrRebuild<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild<T>): Bluebird<T>
{
	({ targetFile, options } = handleOptions(targetFile, options));

	let isFromLocal = false;
	let existsLocal = false;

	return Bluebird.resolve(checkStat(targetFile, options))
		.then<T>(async (statOutdated) =>
		{
			if (statOutdated)
			{
				existsLocal = await pathExists(targetFile)

				return Promise.reject(void 0)
			}

			return (options.rawFile ? readFile : readJSON)(targetFile)
				.then(r =>
				{
					existsLocal = true;
					isFromLocal = true;
					return r
				})
		})
		.catch<T>(async (err) =>
		{
			err && options.console?.warn(err);

			if (options.makeFns?.length)
			{
				for (const fn of options.makeFns)
				{
					try
					{
						let data = await fn(targetFile, options)

						if (typeof data !== 'undefined')
						{
							isFromLocal = false;
							return data;
						}
					}
					catch (err)
					{
						err && options.console?.warn(err);
					}
				}
			}

			return Promise.reject()
		})
		.catch<T>(err =>
		{

			if (options.fallback?.module)
			{
				let data = import(options.fallback.module).then(m => m.default ?? m).catch(e => void 0);

				if (typeof data !== 'undefined')
				{
					isFromLocal = false;
					return data;
				}
			}

			return Promise.reject()
		})
		.catch(err =>
		{
			err && options.console?.warn(err);

			return (options.rawFile ? readFile : readJSON)(targetFile)
				.then(r =>
				{
					existsLocal = true;
					isFromLocal = true;
					return r
				})
		})
		.tap(data =>
		{
			return options.validFn?.(data)
		})
		.tap(async (data) =>
		{

			if (!isFromLocal)
			{
				await (options.rawFile ? saveFile : saveJSON)(targetFile, data, options);

				await updateStat(targetFile, options);
			}
		})
		;
}

export default getLocalOrRebuild
