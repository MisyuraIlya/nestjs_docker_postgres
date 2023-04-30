import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private jwt: JwtService
  ){}
    
  async register(dto: AuthDto) {

		const existUser = await this.usersRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existUser) throw new BadRequestException('User already Exists');

    const user = await this.usersRepository.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      isActive: true
    });

    const save = await this.usersRepository.save(user);


  }

  async login() {

  }

  async getNewTokens() {
    
  }
}
