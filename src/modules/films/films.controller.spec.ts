import { Test, TestingModule } from '@nestjs/testing';
import {} from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { FilmsModule } from './films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { HttpModule } from '@nestjs/axios';
import { plainToClass } from '@nestjs/class-transformer';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const film: Film = plainToClass(Film, {
    id: 1,
    titulo: 'Los',
    introduccion: 'intro',
    director: 'direc',
    productor: 'prod',
    fecha_lanzamiento: '2020-10-10',
    creado: '2020-10-10 10:10:10',
    editado: '2020-10-10 10:10:10',
    url: 'https://les.com',
  });

  const mockedRepo = {
    // mock the repo `findOneOrFail`
    get: jest.fn(() => film),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockedRepo,
        },
      ],
    }).compile();
    service = moduleRef.get<FilmsService>(FilmsService);
    controller = moduleRef.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
