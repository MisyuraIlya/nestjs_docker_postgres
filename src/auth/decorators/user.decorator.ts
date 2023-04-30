import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UsersEntity } from 'src/users/user.entity'
import { Repository } from 'typeorm'

export const CurrentUser = createParamDecorator(
	(data: keyof Repository<UsersEntity>, ctx: ExecutionContext) => {
	  const request = ctx.switchToHttp().getRequest();
	  const user = request.user;
  
	  return data ? user[data] : user;
	},
  );