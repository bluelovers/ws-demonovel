
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
		return (stat && (Date.now() - stat.mtimeMs) < options.ttl)
	}

	return Promise.reject()
}

export async function saveJSON<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>)
{
	await outputJSON(targetFile, data, {
		spaces: 2,
	})

	await outputJSON(options.statFile, await stat(targetFile), {
		spaces: 2,
	})
}

export async function saveFile<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>)
{
	await outputFile(targetFile, data)

	await outputJSON(options.statFile, await stat(targetFile), {
		spaces: 2,
	})
}
