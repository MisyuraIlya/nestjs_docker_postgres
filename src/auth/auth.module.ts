import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { Repository } from 'typeorm';
import { getJwtConfig } from 'src/config/jwt.config';
import { UsersEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Repository],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthModule {}
