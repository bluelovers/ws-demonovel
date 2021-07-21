
import { IOptionsGetLocalOrRebuild } from '../index';

export function handleOptions<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild<T>)
{
	options = {
		...options,
	};

	options.statFile = options.statFile ?? targetFile + '.stat';

	if ((options.ttl |= 0) <= 0)
	{
		options.ttl = 12 * 60 * 60 * 1000
	}

	return {
		targetFile,
		options,
	}
}
