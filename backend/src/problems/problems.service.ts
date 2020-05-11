import { Injectable } from '@nestjs/common';
import { Problem } from '../interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProblemDto } from '../dto/create-problem.dto';

@Injectable()
export class ProblemsService {
    constructor(@InjectModel('Problem') private problemModel: Model<Problem>) {}

    async create(problem: CreateProblemDto): Promise<Problem> {
        const createdProblem = await this.problemModel.create(problem);
        return createdProblem;
    }
}
