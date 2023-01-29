import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Report } from './reports/reports.entity';
import { Users } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [Report, Users]
        }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: "db.sqlite",
    //   entities: [Report, Users],
    //   synchronize: true
    // }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
