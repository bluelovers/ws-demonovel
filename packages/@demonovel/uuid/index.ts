/**
 * Created by user on 2020/6/14.
 */

import { v5 as uuidv5 } from 'uuid';

export function newNovelUUID(siteID: string, uniqueID: string | number): string
{
	let seed = siteID + '#' + String(uniqueID);
	//return hashSum(seed)
	return uuidv5(seed, uuidv5.URL)
}

export default newNovelUUID
