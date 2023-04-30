import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UsersEntity } from 'src/users/user.entity'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private readonly usersRepository: Repository<UsersEntity>
	) {
		console.log('here',configService.get('JWT_SECRET'))
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

    async validate({ id }: Pick<UsersEntity, 'id'>) {
        return this.usersRepository.findOne({
          where: {
            id: id,
          },
        });
    }
}
