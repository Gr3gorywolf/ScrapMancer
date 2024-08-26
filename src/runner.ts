import { Job } from "./types/job";
import cron from "node-cron";
import { executeJob, parseJobsFromFolder } from "./utils/jobs";
import { logWithColor } from "./utils/console";
import { ConsoleColors } from "./utils/constants";

const runningJobs = new Set<string>();
const jobs = parseJobsFromFolder();
const addJobRunner = (job:Job) =>{
   cron.schedule(job.cron, () => { 
    if (runningJobs.has(job.name)) {
        return;
    }
    logWithColor("Running >> " + job.name, ConsoleColors.magenta);
    executeJob(job, ()=>{
        runningJobs.delete(job.name);
    });
    runningJobs.add(job.name);
   }); 
}

for (const job of jobs) {
    logWithColor("Job: " + job.name + " Scheduled! ✓", ConsoleColors.green);
    addJobRunner(job);
}