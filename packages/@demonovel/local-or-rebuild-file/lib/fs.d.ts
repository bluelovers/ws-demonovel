/// <reference types="node" />
import { Stats } from 'fs-extra';
import { IOptionsGetLocalOrRebuild } from '../index';
export type ICacheStats = Pick<Stats, 'mtime' | 'mtimeMs' | 'size' | 'mode'>;
export declare function getStat(targetFile: string, statFile: string): Promise<ICacheStats>;
export declare function checkStat(targetFile: string, options: IOptionsGetLocalOrRebuild<any>): Promise<boolean>;
export declare function isOutdated(stat: ICacheStats, options: IOptionsGetLocalOrRebuild<any>): boolean;
export declare function updateStat<T>(targetFile: string, options: IOptionsGetLocalOrRebuild<any>): Promise<void>;
export declare function saveJSON<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>): Promise<void>;
export declare function saveFile<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>): Promise<void>;
