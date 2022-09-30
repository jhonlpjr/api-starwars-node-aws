import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('films')
@ApiTags('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiResponse({ status: 201, description: 'Creado' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Get('swapi')
  findSwapiAll() {
    return this.filmsService.findSwapiAll();
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Get('swapi/:id')
  findSwapiOne(@Param('id') id: string) {
    return this.filmsService.findSwapiOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 400, description: 'Problemas con parámetros' })
  @ApiResponse({ status: 500, description: 'Problemas de servidor' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
