import { Module } from '@nestjs/common';
import { UserAccessHistoriesService } from './user-access-histories.service';
import { UserAccessHistoriesController } from './user-access-histories.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccessHistories } from 'src/database/entities/userAccessHistories.entity';
import { Users } from 'src/database/entities/users.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserAccessHistories, Users])],
  controllers: [UserAccessHistoriesController],
  providers: [UserAccessHistoriesService],
})
export class UserAccessHistoriesModule { }
