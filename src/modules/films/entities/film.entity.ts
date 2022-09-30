import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  titulo: string;
  @Column()
  id_episodio: number;
  @Column()
  introduccion: string;
  @Column()
  director: string;
  @Column()
  productor: string;
  @Column()
  fecha_lanzamiento: Date;
  @Column()
  creado?: Date;
  @Column()
  editado?: Date;
  @Column()
  url: string;
}
