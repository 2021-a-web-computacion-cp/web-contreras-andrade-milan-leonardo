import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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

  @Get('lista-usuarios')
  listaUsuarios(@Res() response) {
    response.render('inicio');
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
