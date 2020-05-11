import { Controller, Post, Body } from '@nestjs/common';
import { Problem } from '../interfaces';
import { CreateProblemDto } from '../dto/create-problem.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProblemsService } from './problems.service';

@ApiTags('Problem')
@Controller('problems')
export class ProblemsController {
    constructor(private problemsService: ProblemsService) {}

    @Post()
    async create(@Body() createProblemDto: CreateProblemDto): Promise<Problem> {
        return this.problemsService.create(createProblemDto);
    }
}
