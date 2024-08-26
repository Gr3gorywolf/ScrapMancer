import { ConsoleColors } from "./constants";

export const logWithColor = (message: any, color: ConsoleColors) => {
    console.log(`${color}${message}${ConsoleColors.reset}`);
}