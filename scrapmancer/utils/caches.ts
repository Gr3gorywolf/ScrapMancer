import NodeCache from "node-cache"
import fs from  "node:fs";
import { CacheData } from "../types/cacheData";
import path from "node:path";
import { CacheSetting } from "../types/cacheSetting";
import { logWithColor } from "./console";
import { ConsoleColors } from "./constants";
const cache = new NodeCache();
const keyCacheSetting = new Map<string, CacheSetting>()
export const setCache = (cacheKey: string, outputData:any, inputData?:any) => {
    const cachesDir = process.cwd() + "/caches";
    const files = fs.readdirSync(cachesDir);
    let cacheSetting = keyCacheSetting.get(cacheKey);
    if(!cacheSetting){
    files.forEach((file) => {
        const filePath = path.join(cachesDir, file);

        // Check if the file is a JSON file
        if (path.extname(file) === '.json') {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const jsonData:CacheSetting = JSON.parse(fileData);

            // Push parsed JSON data to array
            keyCacheSetting.set(jsonData.key, jsonData);
        }
    });
    cacheSetting = keyCacheSetting.get(cacheKey);
    }
    if(!cacheSetting){
        logWithColor(`Cache file not found for key ${cacheKey}`, ConsoleColors.red);
        return;
    }
    cache.set(cacheKey, {value: outputData, inputHash: inputData ? btoa(JSON.stringify(inputData)) : null} as CacheData,cacheSetting.ttl);
}

export const getCache = (cacheKey: string, inputData?:any):any => {
    const cacheData = cache.get<CacheData>(cacheKey);
    if(!cacheData){
        return null;
    }
    if(!inputData){
        return cacheData.value;
    }
    if(cacheData.inputHash === btoa(JSON.stringify(inputData))){
        return cacheData.value;
    }
    return null;
}