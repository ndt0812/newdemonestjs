import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/utils/schemas/common.schema';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserAccessHistoriesDto } from './dto/create-user-access-histories.dto';
import { UserAccessHistories } from 'src/database/entities/userAccessHistories.entity';

@Injectable()
export class UserAccessHistoriesService {
  constructor(
    @InjectRepository(UserAccessHistories)
    private userAccessHistoriesRepository: Repository<UserAccessHistories>,
  ) { }

  async create(createUserAccessHistoriesDto: CreateUserAccessHistoriesDto) {
    let response: ResponseData = { status: false }
    await this.userAccessHistoriesRepository.save(
      this.userAccessHistoriesRepository.create(createUserAccessHistoriesDto),
    );
    response.status = true;
    return response
  }

  async find(options?: FindManyOptions<UserAccessHistories>) {
    return await this.userAccessHistoriesRepository.find(options);
  }


  async findManyWithPagination(options?: FindManyOptions<UserAccessHistories>, paginationOptions?: IPaginationOptions,) {
    return await this.userAccessHistoriesRepository.findAndCount({
      ...options,
      skip: paginationOptions ? (paginationOptions.page - 1) * paginationOptions.limit : null,
      take: paginationOptions ? paginationOptions.limit : null,
      order: {
        ...options.order,
        CreatedAt: "DESC"
      }
    });
  }

  async findOne(options: FindOneOptions<UserAccessHistories>) {
    return await this.userAccessHistoriesRepository.findOne(options);
  }

  async update(id: number, payload: DeepPartial<UserAccessHistories>) {
    let response: ResponseData = { status: false }
    await this.userAccessHistoriesRepository.save(
      this.userAccessHistoriesRepository.create({
        Id: id,
        ...payload
      }),
    );
    response.status = true;
    return response
  }

  async remove(id: UserAccessHistories["Id"]) {
    let response: ResponseData = { status: false }
    await this.userAccessHistoriesRepository.delete(id);
    response.status = true;
    return response
  }

  async softRemove(id: UserAccessHistories["Id"]) {
    let response: ResponseData = { status: false }
    await this.userAccessHistoriesRepository.softDelete(id);
    response.status = true;
    return response
  }
}
