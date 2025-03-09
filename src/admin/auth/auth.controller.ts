
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from 'src/utils/schemas/common.schema';
import { StringToMd5 } from 'src/utils/md5-helper';
import { AdminGuard } from 'src/guard/admin.guard';
import { ExpressRequest } from 'src/utils/types/expressRequest.interface';
import { getJwtToken } from 'src/utils/decorator/jwt.decorator';
import { AuthChangePasswordDto } from './dto/auth-change-password.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ) {
    let response: ResponseData = { status: false }
    if (createUserDto.Password != createUserDto.RePassword) {
      response.message = "Mật khẩu nhập không trùng nhau!"

      return response
    }

    if (!createUserDto.UserName) {
      response.message = "UserName ko được để trống!"
      return response
    }

    let userName = await this.authService.exist({ where: { UserName: createUserDto.UserName } });
    if (userName) {
      response.message = "UserName đã tồn tại!"
      return response
    }

    createUserDto.Password = StringToMd5(createUserDto.Password);
    response = await this.authService.register(createUserDto);

    return response
  }

  @Post("login")
  async auth(@Body() createAuthDto: CreateAuthDto) {
    let response: ResponseData = { status: false }
    response = await this.authService.login(createAuthDto);
    return response
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get("info")
  async getInfo(@Req() req: ExpressRequest) {
    let response: ResponseData = { status: false }

    response.status = true
    response.data = req.user
    return response
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post("logout")
  async logOut(@Req() req: ExpressRequest) {
    return await this.authService.logout(req);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post("change-password")
  async changePassword(
    @Body() authChangePasswordDto: AuthChangePasswordDto,
    @Req() req: ExpressRequest) {
    let response: ResponseData = { status: false }

    if (authChangePasswordDto.NewPassword != authChangePasswordDto.ReNewPassword) {
      response.message = "Mật khẩu nhập không trùng nhau"
      return response
    }
    authChangePasswordDto.Id = req?.user?.Id
    response = await this.authService.changePassword(authChangePasswordDto);
    return response
  }
}


