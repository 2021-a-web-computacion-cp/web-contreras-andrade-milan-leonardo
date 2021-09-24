import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { Prisma } from '@prisma/client';
//import { LibroCrearDto } from './dto/libro-crear.dto';
import { validate } from 'class-validator';
import { LibroCrearDto } from './dto/libro-crear.dto';
import { LibroEditarDto } from './dto/libro-editar.dto';

// http://localhost:3000/usuario/......
@Controller('libro')
export class LibroController {
  constructor(
    // Inyeccion dependencias
    private libroService: LibroService,
  ) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('lista-libros')
  async listaLibros(@Res() response, @Query() parametrosConsulta) {
    try {
      const respuesta = await this.libroService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('libro/lista', {
        datos: {
          libros: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('libro/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }
  @Post('crear-libro-formulario')
  async crearUsuarioFormualrio(@Res() response, @Body() parametrosCuerpo) {
    let flag = false;
    if (parametrosCuerpo.leido != undefined) {
      flag = true;
    }

    const libroCrearDto = new LibroCrearDto();
    libroCrearDto.nombre = parametrosCuerpo.nombre;
    libroCrearDto.autor = parametrosCuerpo.autor;
    libroCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
    libroCrearDto.calificacion = +parametrosCuerpo.calificacion;
    libroCrearDto.leido = flag;

    try {
      const errores = await validate(libroCrearDto);
      if (errores.length > 0 || libroCrearDto.calificacion > 10) {
        throw new BadRequestException('No envia bien parametros: ');
      } else {
        await this.libroService.crearUno(libroCrearDto);
        response.redirect(
          '/libro/vista-crear' +
            '?mensaje= Se creo el usuario ' +
            parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando libro');
    }
  }

  @Post('editar-libro-formulario/:idLibro')
  async editarLibro(
    @Res() response,
    @Body() parametrosCuerpo,
    @Param() parametrosRuta,
  ) {
    let flag = false;
    if (parametrosCuerpo.leido != undefined) {
      flag = true;
    }
    console.log('Llegue aqui 1');
    console.log(parametrosCuerpo.fechaCreacion);
    console.log(new Date(parametrosCuerpo.fechaCreacion));
    const libroEditarDto = new LibroEditarDto();
    libroEditarDto.nombre = parametrosCuerpo.nombre;
    libroEditarDto.autor = parametrosCuerpo.autor;
    libroEditarDto.fechaCreacion = new Date(parametrosCuerpo.fechaCreacion);
    libroEditarDto.calificacion = +parametrosCuerpo.calificacion;
    libroEditarDto.leido = flag;
    try {
      const errores = await validate(libroEditarDto);
      if (errores.length > 0 || libroEditarDto.calificacion > 10) {
        throw new BadRequestException('No envia bien parametros: ');
      } else {
        //libroEditarDto.fechaCreacion = new Date(libroEditarDto.fechaCreacion);
        console.log('Llegue aqui 2');
        console.log(parametrosCuerpo.fechaCreacion);
        console.log(new Date(parametrosCuerpo.fechaCreacion));
        await this.libroService.actualizarUno({
          id: +parametrosRuta.idLibro,
          data: libroEditarDto,
        });
        console.log('Llegue aqui 3');
        response.redirect(
          '/libro/lista-libros' +
            '?mensaje= Se actualizo el Libro ' +
            parametrosCuerpo.nombre,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException('Error actualizando libro');
    }
  }

  @Post('editar-libro/:idLibro')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const respuesta = await this.libroService.buscarUno(
        +parametrosRuta.idLibro,
      );
      response.render('libro/editar', {
        datos: {
          libro: respuesta,
          id: +parametrosRuta.idLibro,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Post('eliminar-libro/:idLibro')
  async eliminarLibro(@Res() response, @Param() parametrosRuta) {
    try {
      await this.libroService.eliminarUno(+parametrosRuta.idLibro);
      response.redirect(
        '/libro/lista-libros' + '?mensaje=Se elimino al usuario',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }
}
