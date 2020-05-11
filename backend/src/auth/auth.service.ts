import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserInfo } from '../interfaces';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<Partial<User> | null> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        const { password, ...result } = user;
        if (await compare(pass, password)) {
            return result;
        }
        return null;
    }

    async login(user: any): Promise<{ accessToken: string }> {
        const payload: UserInfo = { 
            username: user.username,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
