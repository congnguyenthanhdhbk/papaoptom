import { Document } from "mongoose";

export interface CronJob extends Document {
    times: number;
    status: string;
    start: any;
    end: any;
    domain: string;
}