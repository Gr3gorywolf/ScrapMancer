import { Endpoint } from "../types/endpoint";
import {Express} from 'express'
import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { executeJob } from "./jobs";
import { getCache, setCache } from "./caches";
import { logWithColor } from "./console";
import { ConsoleColors } from "./constants";

export const parseEndpointsFromFolder = ():Endpoint[] =>{
    const parsedJobs:Endpoint[] = [];
    const jobsDir = process.cwd() + "/endpoints";
    const files = fs.readdirSync(jobsDir);
    files.forEach((file) => {
        const filePath = path.join(jobsDir, file);
        if (path.extname(file) === '.json') {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileData);
            parsedJobs.push(jsonData);
        }
    });
    return parsedJobs;
}

export const addEndpoint = (endpoint:Endpoint, server:Express)=>{
    server.use(endpoint.route, (req, res) => {
        let inputData: any = null;
        if(req.method !== endpoint.method){
            res.status(405).send({
                message:"Method Not Allowed"
            });
            return;
        }
        if(['POST','PUT'].includes(req.method)){
            inputData = req.body;
        }
        if(endpoint.cacheKey){
            const cacheData = getCache(endpoint.cacheKey, inputData);
            if(cacheData){
                logWithColor(`Cache ${ endpoint.cacheKey} retrieved for ${endpoint.method}:${endpoint.route}` , ConsoleColors.green);
                res.send(cacheData);
                return;
            }
        }

        executeJob({
            name:endpoint.route,
            triggerTest:endpoint.triggerTest,
            cron:"* * * * *"
        }, (hasError, outputData)=>{
            if(hasError){
                res.status(500).send({
                    message:"Internal Server Error"
                });
                return;
            }
            res.send(outputData);
            if(endpoint.cacheKey){
                setCache(endpoint.cacheKey, outputData, inputData);
                logWithColor(`Cache ${ endpoint.cacheKey} set for ${endpoint.method}:${endpoint.route}` , ConsoleColors.green);
            }
        },inputData);

    });
}