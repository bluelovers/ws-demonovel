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

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(newNovelUUID, "__esModule", { value: true });

	Object.defineProperty(newNovelUUID, 'newNovelUUID', { value: newNovelUUID });
	Object.defineProperty(newNovelUUID, 'default', { value: newNovelUUID });

}

export default newNovelUUID
