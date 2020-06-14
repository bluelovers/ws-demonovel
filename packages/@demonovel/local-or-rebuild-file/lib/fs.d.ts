/// <reference types="node" />
import { Stats } from 'fs-extra';
import { IOptionsGetLocalOrRebuild } from '../index';
export declare function getStat(targetFile: string, statFile: string): Promise<Stats>;
export declare function checkStat(targetFile: string, options: IOptionsGetLocalOrRebuild): Promise<boolean>;
export declare function saveJSON(targetFile: string, data: any, options: IOptionsGetLocalOrRebuild): Promise<void>;
export declare function saveFile(targetFile: string, data: any, options: IOptionsGetLocalOrRebuild): Promise<void>;
