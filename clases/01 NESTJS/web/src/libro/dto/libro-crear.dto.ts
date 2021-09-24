import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class LibroCrearDto {
  @IsNotEmpty() //Requericdo
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombre: string;

  @IsNotEmpty() //Requericdo
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  autor: string;

  @IsEmpty() //Debe estar vacio
  fechaCreacion: string;

  @IsNotEmpty() //Requericdo
  @IsNumber()
  @IsPositive()
  calificacion: number;

  leido: boolean;
}
