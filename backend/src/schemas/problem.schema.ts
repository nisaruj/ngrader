import { Schema } from 'mongoose';

export const TestcaseSchema = new Schema({
  input: String,
  output: String,
})

export const ProblemSchema = new Schema({
  title: String,
  description: String,
  timeLimit: Number,
  memoryLimit: Number,
  createdTime: { type: Date, default: () => new Date() },
  testcases: { type: [TestcaseSchema], default: [] },
  tags: { type: [String], default: [] },
});