import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './admin/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Users } from './database/entities/users.entity';
import { UserModule } from './admin/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [Users],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),

    AuthModule,

    UserModule],
  controllers: [],
  providers: [],
})

export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) { }

  async onModuleInit() {
    try {
      // Kiểm tra xem database đã kết nối thành công chưa
      if (this.dataSource.isInitialized) {
        Logger.log('Successfully connected to the database!', 'Database');
      } else {
        throw new Error('Database connection is not initialized');
      }
    } catch (error) {
      Logger.error('Database connection failed!', error.message, 'Database');
    }
  }
}
