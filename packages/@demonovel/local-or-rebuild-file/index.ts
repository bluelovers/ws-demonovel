
import { readJSON, pathExists, readFile } from 'fs-extra';
import Bluebird from 'bluebird';
import { ITSResolvable } from 'ts-type';
import { saveFile, saveJSON, checkStat } from './lib/fs';
import { handleOptions } from './lib/util';

export interface IOptionsGetLocalOrRebuild
{
	statFile?: string;
	ttl?: number,
	force?: boolean,

	makeFns?: ((targetFile: string, options: IOptionsGetLocalOrRebuild) => ITSResolvable<any>)[];

	fallback?: {
		module?: string,
	},

	validFn?(data): asserts data,

	console?: Console,

	rawFile?: boolean,
}

export function getLocalOrRebuild<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild): Bluebird<T>
{
	({ targetFile, options } = handleOptions(targetFile, options));

	let isFromLocal = false;
	let existsLocal = false;

	return Bluebird.resolve(checkStat(targetFile, options))
		.then(async (stat) =>
		{
			if (!stat)
			{
				existsLocal = await pathExists(targetFile)

				return Promise.reject()
			}

			return (options.rawFile ? readFile : readJSON)(targetFile)
				.then(r =>
				{
					existsLocal = true;
					isFromLocal = true;
					return r
				})
		})
		.catch(async (err) =>
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
		.catch(err => {
			if (options.fallback)
			{
				if (options.fallback.module)
				{
					let data = import(options.fallback.module).then(m => m.default ?? m).catch();

					if (typeof data !== 'undefined')
					{
						isFromLocal = false;
						return data;
					}
				}
			}

			return Promise.reject()
		})
		.catch(err => {
			err && options.console?.warn(err);

			return (options.rawFile ? readFile : readJSON)(targetFile)
				.then(r =>
				{
					existsLocal = true;
					isFromLocal = true;
					return r
				})
		})
		.tap(data => {
			return options.validFn?.(data)
		})
		.tap(async (data) => {

			if (!isFromLocal)
			{
				await (options.rawFile ? saveFile : saveJSON)(targetFile, data, options)
			}

		})
		;
}

export default getLocalOrRebuild
