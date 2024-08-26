import { Job } from "../types/job";
import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { spawn } from "node:child_process";
import { logWithColor } from "./console";
import { ConsoleColors } from "./constants";

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


export const executeJob = (job:Job, onFinish:()=>void) =>{
    const testRun = spawn('npx', ['playwright', 'test', job.triggerTest], {shell: true});

    testRun.stdout.on('data', (data) => {
        logWithColor(`${job.name} >> ${data}`,ConsoleColors.blue);
      });
      
      // Listen to the standard error (stderr) stream
      testRun.stderr.on('data', (data) => {
        logWithColor(`${job.name} - error >> ${data}`,ConsoleColors.red);
      });
      
      // Listen for the 'close' event, which signals that the process is done
      testRun.on('close', (code) => {
        logWithColor(`${job.name} is done!`, ConsoleColors.green);
        onFinish();
      });
      
      // Optional: Listen for the 'error' event if there's an issue starting the process
      testRun.on('error', (error) => {
        logWithColor(`Error executing the job ${job.name}: ${error.message}`, ConsoleColors.red);
      });
}