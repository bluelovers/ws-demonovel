
import { Stats, readJSON, stat, outputJSON, outputFile } from 'fs-extra';
import { IOptionsGetLocalOrRebuild } from '../index';

export function getStat(targetFile: string, statFile: string): Promise<Stats>
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

export function isOutdated(stat: Stats, options: IOptionsGetLocalOrRebuild<any>)
{
	return !stat || ((Date.now() - stat.mtimeMs) > options.ttl)
}

export async function updateStat<T>(targetFile: string, options: IOptionsGetLocalOrRebuild<any>)
{
	return outputJSON(options.statFile, await stat(targetFile), {
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
