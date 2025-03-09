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
import { UpdateInfoDto } from './dto/update-info.dto';
import { StringToMd5 } from 'src/utils/md5-helper';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("getUsers")
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    let [data, total] = await this.userService.findManyWithPagination({
      where: { ApplicationType: req?.user?.IsAdmin == false ? ApplicationTypeEnums.User : null },
    }, { page, limit });

    response.status = true
    response.total = total
    response.data = data

    return response
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    if (req?.user?.IsAdmin == false) {
      response.message = "User ko có quyền thao tác tính năng này!"

      return response
    }

    createUserDto.Password = StringToMd5(createUserDto.Password);
    response = await this.userService.create(createUserDto, req)

    return response
  }

  @Post('updateInfo')
  async updateInfo(
    @Body() updateInfoDto: UpdateInfoDto,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    if (!updateInfoDto.UserName) {
      response.message = "UserName ko được để trống!"
      return response
    }

    let userName = await this.userService.exist({ where: { UserName: updateInfoDto.UserName } });
    if (userName) {
      response.message = "UserName đã tồn tại!"
      return response
    }

    response = await this.userService.update(req?.user?.Id, updateInfoDto)

    return response
  }

  @Get('update/:id')
  async update(
    @Param('id') id: string
  ) {
    let response: ResponseData = { status: false }
    let user = await this.userService.findOne({ where: { Id: +id } })

    response.status = true
    response.data = user
    return response
  }

  @Post('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    if (req?.user?.IsAdmin == false) {
      response.message = "User ko có quyền thao tác tính năng này!"

      return response
    }

    response = await this.userService.update(+id, updateUserDto)

    return response
  }

  @Delete('remove/:id')
  async remove(
    @Param('id') id: string,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    if (req?.user?.IsAdmin == false) {
      response.message = "User ko có quyền thao tác tính năng này!"

      return response
    }

    response = await this.userService.softRemove(+id)

    return response
  }
}
