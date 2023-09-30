import { outputFile, outputJSON, readJSON, stat, Stats } from 'fs-extra';
import { IOptionsGetLocalOrRebuild } from '../index';

export type ICacheStats = Pick<Stats, 'mtime' | 'mtimeMs' | 'size' | 'mode'>

export function getStat(targetFile: string, statFile: string): Promise<ICacheStats>
{
	return readJSON(statFile)
		.catch(e => stat(targetFile))
		//.catch(r => Promise.reject())
		;
}

export async function checkStat(targetFile: string, options: IOptionsGetLocalOrRebuild<any>)
{
	if (!options.force)
	{
		let stat = await getStat(targetFile, options.statFile);
		return isOutdated(stat, options)
	}

	return Promise.reject()
}

export function isOutdated(stat: ICacheStats, options: IOptionsGetLocalOrRebuild<any>)
{
	return !stat || ((Date.now() - stat.mtimeMs) > options.ttl)
}

export async function updateStat<T>(targetFile: string, options: IOptionsGetLocalOrRebuild<any>)
{
	let {
		mode,
		size,
		mtime,
		mtimeMs,
	}: ICacheStats = await stat(targetFile);

	const data: ICacheStats = {
		mode,
		size,
		mtime,
		mtimeMs,
	};

	return outputJSON(options.statFile, data, {
		spaces: 2,
	})
}

export function saveJSON<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>)
{
	return outputJSON(targetFile, data, {
		spaces: 2,
	})
}

export function saveFile<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>)
{
	return outputFile(targetFile, data as any)
}
