import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { Scope } from '@nestjs/common/interfaces/scope-options.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: CurrentUserInterceptor
    }
  ],

})
export class UsersModule { }
