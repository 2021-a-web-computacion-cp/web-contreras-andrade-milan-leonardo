import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }

  @Get('/html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML</h1>';
  }

  @Get('/json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json"}';
  }
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }
  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }
  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //rquest - PETICION
    @Res() res, //response  - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', //Nombre
      'Tengo hambre', // Valor
    );
    res.send('ok'); //return de antes
  }

  @Get('mostrar-cookie')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      formadas: req.signedCookies,
    };
    return mensaje;
  }
}
