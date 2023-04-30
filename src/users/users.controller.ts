import { Controller, Get } from '@nestjs/common';
import { UsersEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService){}

    @Get()
    async getAllUsers(): Promise<Array<UsersEntity>> {
        return this.usersService.getAllUsers();
    }
}
