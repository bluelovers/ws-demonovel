
import { IOptionsGetLocalOrRebuild } from '../index';
import { resolve } from 'path';

export function handleOptions<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild<T>)
{
	options = {
		...options,
	};

	targetFile = resolve(targetFile);

	options.statFile ??= targetFile + '.stat';

	options.statFile = resolve(options.statFile);

	if ((options.ttl |= 0) <= 0)
	{
		options.ttl = 12 * 60 * 60 * 1000
	}

	return {
		targetFile,
		options,
	}
}
