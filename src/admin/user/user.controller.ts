import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApplicationTypeEnums } from 'src/utils/enums.utils';
import { pagination } from 'src/utils/types/pagination';
import { ExpressRequest } from 'src/utils/types/expressRequest.interface';
import { ResponseData } from 'src/utils/schemas/common.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags("Admin/User")
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("getUsers")
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    // if (req?.user?.IsAdmin == false) {
    //   response.message = "User ko có quyền thao tác tính năng này!"

    //   return response
    // }

    let [data, total] = await this.userService.findManyWithPagination({
      where: { ApplicationType: req?.user?.IsAdmin == false ? ApplicationTypeEnums.User : null },
    }, { page, limit });

    response.status = true
    response.total = total
    response.data = data

    return response
  }

  @Post('create')
  async createUser() {

  }
}
