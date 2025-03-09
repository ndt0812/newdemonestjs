import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';
import { UserAccessHistoriesService } from '../user-access-histories/user-access-histories.service';
import { UserAccessHistories } from 'src/database/entities/userAccessHistories.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Users, UserAccessHistories])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CacheService, UserAccessHistoriesService],
})
export class AuthModule { }
