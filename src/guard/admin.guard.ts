import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Users } from 'src/database/entities/users.entity';
import { ExpressRequest } from 'src/utils/types/expressRequest.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: ExpressRequest = context.switchToHttp().getRequest();

        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException('No token provided');
        try {
            const token: string = authHeader ? authHeader.substring(7) : "";

            let dataInfo = await this.cacheManager.get(`token:${token}`);
            if (dataInfo == undefined) return false;

            const dataToken = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
            let user = await this.usersRepository.findOne({ where: { Id: dataToken.id } })

            req.user = user;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

    }
}