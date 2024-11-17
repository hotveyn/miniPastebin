import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserProcedure } from './procedure/create-user.procedure';
import { GetUserProcedure } from './procedure/get-user.procedure';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserProcedure: CreateUserProcedure,
    private readonly getUserProcedure: GetUserProcedure,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserProcedure.execute(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUserProcedure.execute({ id });
  }
}
