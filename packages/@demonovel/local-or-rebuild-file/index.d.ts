import Bluebird from 'bluebird';
import { ITSResolvable } from 'ts-type';
export interface IOptionsGetLocalOrRebuild<T = any> {
    statFile?: string;
    ttl?: number;
    force?: boolean;
    makeFns?: ((targetFile: string, options: IOptionsGetLocalOrRebuild<T>) => ITSResolvable<T>)[];
    fallback?: {
        module?: string;
    };
    validFn?(data: unknown): asserts data is T;
    console?: Console;
    rawFile?: boolean;
}
export declare function getLocalOrRebuild<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild<T>): Bluebird<T>;
export default getLocalOrRebuild;
