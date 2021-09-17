import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsuarioCrearDto {
  @IsNotEmpty() //Requericdo
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  apellido: string;

  @IsOptional() //Opcional
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nombre: string;

  @IsEmpty() //Debe estar vacio
  fechaCreacion: string;
}
