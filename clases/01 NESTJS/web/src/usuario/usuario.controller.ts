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
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { validate } from 'class-validator';

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}

  @Post('eliminar-usuario/:idUsuario')
  async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
    try {
      await this.usuarioService.eliminarUnoNew(+parametrosRuta.idUsuario);
      response.redirect(
        '/usuario/lista-usuarios' + '?mensaje=Se elimino al usuario',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }

  @Post('crear-usuario-formulario')
  async crearUsuarioFormualrio(@Res() response, @Body() parametrosCuerpo) {
    try {
      const respuestaUsuario = await this.usuarioService.crearUno({
        nombre: parametrosCuerpo.nombre,
        apellido: parametrosCuerpo.apellido,
      });
      response.redirect(
        '/usuario/vista-crear' +
          '?mensaje= Se creo el usuario ' +
          parametrosCuerpo.nombre,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando usuario');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('usuario/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('usuario/lista', {
        datos: {
          usuarios: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }

  @Post()
  async crearUno(@Body() bodyParams) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = bodyParams.nombre;
    usuarioCrearDto.apellido = bodyParams.apellido;
    usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
    try {
      const errores = await validate(usuarioCrearDto);
      if (errores.length > 0) {
        throw new BadRequestException('No envia bien parametros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new BadRequestException('Error Servidor');
    }
  }

  @Put(':idUsuario')
  actualizarUno(@Body() bodyParams, @Param() parametrosRuta) {
    return this.usuarioService.actualizarUno({
      id: +parametrosRuta.idUsuario,
      data: bodyParams,
    });
  }

  @Delete(':idUsuario')
  eliminarUno(@Param() parametro) {
    const objetoUsuario: Prisma.EPN_USUARIOWhereUniqueInput = {
      id: Number(parametro.idUsuario),
    };
    return this.usuarioService.eliminarUno(objetoUsuario);
  }
}
