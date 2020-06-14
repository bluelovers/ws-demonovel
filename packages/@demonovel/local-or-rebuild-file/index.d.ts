import Bluebird from 'bluebird';
import { ITSResolvable } from 'ts-type';
export interface IOptionsGetLocalOrRebuild {
    statFile?: string;
    ttl?: number;
    force?: boolean;
    makeFns?: ((targetFile: string, options: IOptionsGetLocalOrRebuild) => ITSResolvable<any>)[];
    fallback?: {
        module?: string;
    };
    validFn?(data: any): asserts data;
    console?: Console;
    rawFile?: boolean;
}
export declare function getLocalOrRebuild<T>(targetFile: string, options?: IOptionsGetLocalOrRebuild): Bluebird<T>;
export default getLocalOrRebuild;
