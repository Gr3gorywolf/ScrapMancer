import { Job } from "../types/job";
import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { spawn } from "node:child_process";
import { logWithColor } from "./console";
import { ConsoleColors } from "./constants";
import { readResultsOutput } from "../test-helpers";

export const parseJobsFromFolder = ():Job[] =>{
    const parsedJobs:Job[] = [];
    const jobsDir = process.cwd() + "/jobs";
    const files = fs.readdirSync(jobsDir);
    files.forEach((file) => {
        const filePath = path.join(jobsDir, file);

        // Check if the file is a JSON file
        if (path.extname(file) === '.json') {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileData);

            // Push parsed JSON data to array
            parsedJobs.push(jsonData);
        }
    });
    return parsedJobs;
}


export const executeJob = (job:Job, onFinish:(hasError:boolean, output:any)=>void, inputData?:any) =>{
    const env = Object.create(process.env);
    if(inputData){
      env.INPUT_DATA = JSON.stringify(inputData);
    }
    const testRun = spawn('npx', ['playwright', 'test', job.triggerTest], {shell: true, env});
    let hasError = false;
    let outputs:any[] = [];
    testRun.stdout.on('data', (data) => {
        const outputResult = readResultsOutput(data.toString());
        if(outputResult){
          outputs.push(outputResult);
        }else{
          logWithColor(`${job.name} >> ${data}`,ConsoleColors.blue);
        }
      });
      testRun.stderr.on('data', (data) => {
        logWithColor(`${job.name} - error >> ${data}`,ConsoleColors.red);
        hasError = true;
      });
      testRun.on('close', (code) => {
        logWithColor(`${job.name} is done!`, ConsoleColors.green);
        const output = outputs.length > 0 ? 
        outputs.length > 1 ? outputs : outputs[0]
        : null;
        onFinish(hasError, output);
      });
      testRun.on('error', (error) => {
        logWithColor(`Error executing the job ${job.name}: ${error.message}`, ConsoleColors.red);
        hasError = true;
      });
}