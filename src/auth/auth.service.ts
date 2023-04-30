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
      password: await hash(dto.password),
      firstName: dto.firstName,
      lastName: dto.lastName,
      isActive: true,
      isAdmin: dto.isAdmin
    });

    const save = await this.usersRepository.save(user);

    const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUsersFields(user),
			...tokens
		}
  }

  async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUsersFields(user),
			...tokens
		}
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.usersRepository.findOne({
      where: {
        id: result.id
      }
    })

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUsersFields(user),
			...tokens
		}
  }

  private async issueTokens(userId: number) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  private returnUsersFields(user: UsersEntity) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
