import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './modules/films/films.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'starwars.cpdbzkmi5jsm.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'starwars',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
  FilmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
