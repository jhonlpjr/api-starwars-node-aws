import { Test, TestingModule } from '@nestjs/testing';
import {} from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { FilmsModule } from './films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { plainToClass } from '@nestjs/class-transformer';
import { Provider } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const film: Film = new Film ();
  film.id = 1;
  film.titulo = 'Los';
  film.introduccion = 'intro';
  film.director = 'direc';
  film.productor = 'prod';
  film.fecha_lanzamiento = new Date();
  film.creado = new Date();
  film.editado = new Date();
  film.url = 'https://les.com';


  const dto: CreateFilmDto = new CreateFilmDto ();
  dto.titulo = 'asfas';
  dto.introduccion = 'fasf';
  dto.director = 'direc';
  dto.productor = 'prod';
  dto.fecha_lanzamiento = new Date();
  dto.creado = new Date();
  dto.editado = new Date();
  dto.url = 'adaaf';


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            create: jest.fn().mockResolvedValue(dto),
            findAll: jest.fn().mockResolvedValue([film]),
            findOne: jest.fn().mockResolvedValue(film),// really it can be anything, but the closer to your actual logic the better
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Debería traer films desde el controlador.', async () => {
      const listFilmsResponse = await controller.findAll();
      expect(listFilmsResponse).toEqual([film]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    }); 
  });

  describe('create', () => {
    it('Debería traer films desde el controlador.', async () => {
      const listFilmsResponse = await controller.create(dto);
      expect(listFilmsResponse).toEqual(dto);
      expect(service.create).toHaveBeenCalledTimes(1);
    }); 
  })

});
