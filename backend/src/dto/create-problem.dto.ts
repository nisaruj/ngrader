import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, Length } from 'class-validator';

class Testcase {
    @ApiProperty()
    input: string

    @ApiProperty()
    output: string
}

export class CreateProblemDto {
  @ApiProperty()
  @Length(1, 30)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @Min(1)
  @Max(5)
  timeLimit: number;

  @ApiProperty()
  @Min(1)
  @Max(128)
  memoryLimit: number;

  @ApiProperty({ type: [Testcase] })
  testcases: Testcase[];

  @ApiProperty()
  tags: string[];
}