import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmsRepository: Repository<Film>,
    private readonly httpService: HttpService,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    return await this.filmsRepository.save(createFilmDto);
  }

  async findAll() {
    return await this.filmsRepository.find();
  }

  async findOne(id: number) {
    return await this.filmsRepository.findOneBy({ id: id });
  }

  async findSwapiAll() {
    const result = await this.httpService.axiosRef
      .get(
        `${process.env.API_STARWARS}films`,
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
    console.log(result);
    return {data: result.results};
  }

  async findSwapiOne(id: number) {
    const result = await this.httpService.axiosRef
      .get(
        `${process.env.API_STARWARS}films/${id}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
    console.log(result);
    return {data: result};
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.findOneBy({ id: id })
    if(!film) return 'No existe película';
    return await this.filmsRepository.update(id, updateFilmDto);
  }

  async remove(id: number) {
    return await this.filmsRepository.delete(id);
  }
}
