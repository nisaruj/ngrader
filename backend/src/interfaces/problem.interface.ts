import { Document } from 'mongoose';

export interface Testcase extends Document {
    input: string,
    output: string,
}

export interface Problem extends Document {
    title: string,
    description: string,
    timeLimit: number,
    memoryLimit: number,
    createdTime: Date,
    testcases: Testcase[],
    tags: string[],
}