import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [TypeOrmModule.forFeature([Film]),
  HttpModule,],
})
export class FilmsModule {}
