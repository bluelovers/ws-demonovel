/// <reference types="node" />
import { Stats } from 'fs-extra';
import { IOptionsGetLocalOrRebuild } from '../index';
export declare function getStat(targetFile: string, statFile: string): Promise<Stats>;
export declare function checkStat(targetFile: string, options: IOptionsGetLocalOrRebuild<any>): Promise<boolean>;
export declare function saveJSON<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>): Promise<void>;
export declare function saveFile<T>(targetFile: string, data: T, options: IOptionsGetLocalOrRebuild<any>): Promise<void>;
