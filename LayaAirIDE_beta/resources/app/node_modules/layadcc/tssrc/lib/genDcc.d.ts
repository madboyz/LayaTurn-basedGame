declare module 'genDcc'{
    /**
     * @param url {string} 生成cache是给那个url用的
     */
    export function gendcc(srcpath:string, outpath:string, genCache:boolean, urlToLowwer:boolean,url:string):void;
} 