import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces';
import { CreateUserDto } from '../dto';
import { hash } from 'bcryptjs';

const SALT_LEN = 8;

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(user: CreateUserDto): Promise<User> {
        if (await this.userModel.exists({ username: user.username })) {
            throw new HttpException('Username already exists.', HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await hash(user.password, SALT_LEN);
        const createdUser = this.userModel.create({
            ...user,
            password: hashedPassword
        });
        return createdUser;
    }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({ username }).lean();
    }
}
