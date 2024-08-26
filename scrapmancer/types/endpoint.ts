export interface Endpoint {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    triggerTest: string;
    description?:string;
    cacheTimeSecs?: number;
}