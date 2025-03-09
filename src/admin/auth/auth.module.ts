import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CacheService],
})
export class AuthModule { }
