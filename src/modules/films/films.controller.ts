import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('films')
@ApiTags('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @Get('swapi')
  findSwapiAll() {
    return this.filmsService.findSwapiAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Get('swapi/:id')
  findSwapiOne(@Param('id') id: string) {
    return this.filmsService.findSwapiOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
