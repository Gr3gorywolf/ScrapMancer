import express from 'express';
import { addEndpoint, parseEndpointsFromFolder } from './utils/endpoints';
import { logWithColor } from './utils/console';
import { ConsoleColors } from './utils/constants';

const app = express();
const port = 4848;
const endpoints = parseEndpointsFromFolder();
app.use(express.json());  
for (let endpoint of endpoints) {
    logWithColor(`Endpoint ${endpoint.method}: ${endpoint.route} added! ✓`, ConsoleColors.green);
    addEndpoint(endpoint, app);
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});