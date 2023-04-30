import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator'
export class AuthDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	firstName: string

	@IsOptional()
	@IsString()
	lastName: string

	@IsOptional()
	@IsBoolean()
	isAdmin: boolean

	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	password: string
}