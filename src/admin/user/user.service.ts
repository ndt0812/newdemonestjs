import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/users.entity';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ResponseData } from 'src/utils/schemas/common.schema';
import { ExpressRequest } from 'src/utils/types/expressRequest.interface';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) { }

  async find(options?: FindManyOptions<Users>) {
    return await this.userRepository.find(options);
  }

  async exist(options?: FindManyOptions<Users>) {
    return await this.userRepository.exist(options);
  }

  async findManyWithPagination(options?: FindManyOptions<Users>, paginationOptions?: IPaginationOptions,) {
    return await this.userRepository.findAndCount({
      ...options,
      skip: paginationOptions ? (paginationOptions.page - 1) * paginationOptions.limit : null,
      take: paginationOptions ? paginationOptions.limit : null,
      order: {
        ...options.order,
        CreatedAt: "DESC"
      },
    });
  }

  async findOne(options: FindOneOptions<Users>) {
    return await this.userRepository.findOne(options);
  }

  async create(createUserDto: CreateUserDto, req: ExpressRequest) {
    let response: ResponseData = { status: false }
    let info = await this.userRepository.save(
      this.userRepository.create({
        ...createUserDto,
        CreatedBy: req?.user?.UserName
      }),
    );
    response.status = true;
    response.data = info
    return response
  }

  async update(id: Users["Id"], payload: DeepPartial<Users>) {
    let response: ResponseData = { status: false }
    await this.userRepository.save(
      this.userRepository.create({
        Id: id,
        ...payload
      }),
    );
    response.status = true;
    return response
  }

  async remove(id: Users["Id"]) {
    let response: ResponseData = { status: false }
    await this.userRepository.delete(id);
    response.status = true;
    return response
  }

  async softRemove(id: Users["Id"]) {
    let response: ResponseData = { status: false }
    await this.userRepository.softDelete(id);
    response.status = true;
    return response
  }
}
