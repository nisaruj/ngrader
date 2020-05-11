import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemSchema } from '../schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Problem', schema: ProblemSchema }])],
  exports: [MongooseModule.forFeature([{ name: 'Problem', schema: ProblemSchema }])],
  providers: [ProblemsService],
  controllers: [ProblemsController]
})
export class ProblemsModule { }
