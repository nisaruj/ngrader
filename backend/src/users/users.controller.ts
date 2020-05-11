import { Controller, Body, Post } from '@nestjs/common';
import { User } from '../interfaces';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
