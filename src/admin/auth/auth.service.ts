import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Users } from 'src/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from 'src/utils/schemas/common.schema';
import { ApplicationTypeEnums } from 'src/utils/enums.utils';
import { StringToMd5 } from 'src/utils/md5-helper';
import * as ms from 'ms';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  async exist(options?: FindManyOptions<Users>) {
    return await this.usersRepository.exist(options);
  }

  async register(createAuthDto: CreateUserDto) {
    var response: ResponseData = { status: false }

    createAuthDto.ApplicationType = createAuthDto.IsAdmin == true ? ApplicationTypeEnums.Admin : ApplicationTypeEnums.User
    let info = await this.usersRepository.save(
      this.usersRepository.create({
        ...createAuthDto
      })
    )

    response.status = true;
    response.data = info;
    return response
  }

  async login(loginDto: CreateAuthDto) {
    let response: ResponseData = { status: false }

    loginDto.Password = StringToMd5(loginDto.Password);
    let user = await this.usersRepository.findOne({
      where: {
        UserName: ILike(loginDto.UserName),
        Password: loginDto.Password
      }
    });

    if (user == null) {
      response.message = "Tài khoản hoặc mật khẩu sai!"

      return response;
    }
    loginDto.Id = user.Id;
    delete user.Password

    let { token, tokenExpires } = await this.getTokensData({ id: loginDto.Id, userName: loginDto.UserName })
    response.status = true;
    response.token = token
    response.tokenExpires = tokenExpires
    response.data = {
      Info: user,
    }

    return response

  }

  private async getTokensData(data: { id: number, userName: string }) {
    const tokenExpires = Date.now() + ms("24h")

    const token = await this.jwtService.signAsync(
      data,
      {
        secret: process.env.JWT_SECRET,
        expiresIn: "24h",
      },
    )

    return { token, tokenExpires, };
  }
}
