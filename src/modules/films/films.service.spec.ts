import { Test, TestingModule } from '@nestjs/testing';
import {} from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { FilmsModule } from './films.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { plainToClass } from '@nestjs/class-transformer';
import { Provider } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: Repository<Film>;

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
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockResolvedValue([film]),
            findOneBy: jest.fn().mockResolvedValue(film),// really it can be anything, but the closer to your actual logic the better
          },
        },
      ],
    }).compile();
    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
  });

  //const useCase = service.findAll;
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(filmRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', async () => {
      const listFilmsResponse = await service.findAll();
      expect(listFilmsResponse).toEqual([film]);
      expect(filmRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be defined', async () => {
      const filmsResponse = await service.findOne(1);
      expect(filmsResponse).toEqual(film);
      expect(filmRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  // it('filmRepository should be defined', () => {
  //   expect(filmRepository).toBeDefined();
  // })
});
