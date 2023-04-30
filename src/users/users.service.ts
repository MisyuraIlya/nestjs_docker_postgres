import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './user.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>){}

    async getAllUsers(): Promise<Array<UsersEntity>> {
        return this.usersRepository.find({})
    }
}
