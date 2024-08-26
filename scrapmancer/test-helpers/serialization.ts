import { resultsOutputLiteral } from "../utils/constants";
import process from "node:process";

export const writeResultsOutput = (results: any) => { 
    console.log(`${resultsOutputLiteral}${JSON.stringify(results)}${resultsOutputLiteral}`);
}


export const getTestInputData = ():any => {
    const inputData = process.env.INPUT_DATA;
    if (inputData) {
      return JSON.parse(inputData);
    }
    return null;
  }

export const getLogWithoutOutput = (output:string) => {
    if(!output.includes(resultsOutputLiteral)){
        return output;
    }
    const regex = new RegExp(`(.*)${resultsOutputLiteral}`);
    const match = output.match(regex);
    return match ? match[1] : output;
}

export const readResultsOutput = (output: string) => {
    if(!output.includes(resultsOutputLiteral)){
        return null;
    }
    const regex = new RegExp(`${resultsOutputLiteral}(.*)${resultsOutputLiteral}`);
    const match = output.match(regex);
    const results = match ?JSON.parse( match[1]) : null;
    return results;
}