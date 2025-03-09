import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, CacheService],
})
export class UserModule { }
