import { Controller, Get, UseGuards, Query, DefaultValuePipe, ParseIntPipe, Req } from '@nestjs/common';
import { UserAccessHistoriesService } from './user-access-histories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { pagination } from 'src/utils/types/pagination';
import { ExpressRequest } from 'src/utils/types/expressRequest.interface';
import { ResponseData } from 'src/utils/schemas/common.schema';

@ApiTags("User-Access")
@ApiBearerAuth()
@UseGuards(AdminGuard)
@Controller('user-access')
export class UserAccessHistoriesController {
  constructor(private readonly userAccessHistoriesService: UserAccessHistoriesService) { }

  @Get("get")
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Req() req: ExpressRequest
  ) {
    let response: ResponseData = { status: false }

    if (req?.user?.IsAdmin == false) {
      response.message = "User ko có quyền thao tác tính năng này!"

      return response
    }

    if (limit > 50) {
      limit = 50;
    }

    let [data, total] = await this.userAccessHistoriesService.findManyWithPagination(
      {
        select: {
          Id: true,
          AccessType: true,
          CreatedAt: true,
          User: {
            Id: true,
            UserName: true,
            DisplayName: true,
            IsAdmin: true
          }
        },
        relations: {
          User: true,
        }
      },
      { page, limit })

    response.status = true
    response.total = total
    response.data = data

    return response
  }

}
