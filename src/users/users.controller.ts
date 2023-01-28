import { Controller, Post, Body, Get, Patch, Put, Param, Query, NotFoundException } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(
      body.email, body.password
    )
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    return this.userService.update(parseInt(id), body)
  }
}
