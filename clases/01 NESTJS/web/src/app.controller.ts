import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
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
    res.cookie(
      'galleta Segura', //Nombre
      'Web :3', // Valor
      {
        secure: true, //Solo se transfieren por canales confiables https
        signed: true,
      },
    );
    res.send('ok'); //return de antes
  }

  @Get('mostrar-cookie')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    //req.signedCookies.total
    return mensaje;
  }

  @Get('parametros-de-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabecera de respuesta (response header)
  @Header('EPN', 'SISTEMAS') // Cabecera de respuesta (response header)
  parametrosConsulta(@Query() queryParams, @Param() params) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-de-cuerpo') //Codigo por defecto 201
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabecerasPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
  // Deber++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  @Get('suma/:numero1/:numero2')
  @HttpCode(200)
  suma(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
    //function operacionesMC(res, req, operacion, numero1, numero2)
    const parametrosRutaMC = params;
    const numero1 = Number(parametrosRutaMC['numero1'].toString());
    const numero2 = Number(parametrosRutaMC['numero2'].toString());

    const result = operacionesMC(res, req, 'suma', numero1, numero2);
    const resultadoSuma = result.resultadoOperacion;
    const cookieMC = result.cookieMC;
    /*
    const resultadoSumaNumber: number = numero1 + numero2;
    const resultadoSuma = resultadoSumaNumber.toString();
    const cookieMC = req.cookies;
    const valorCookie = cookieMC['cookieNumero'];
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    if (valorCookie == undefined) {
      const nuevoValor = 100 - resultadoSumaNumber;
      res.cookie(
        'cookieNumero', //Nombre
        String(nuevoValor), // Valor
      );
      cookieMC['cookieNumero'] = String(nuevoValor);
      console.log('Se seteo la cookie');
    } else {
      const nuevoValor = Number(valorCookie) - resultadoSumaNumber;
      if (nuevoValor > 0) {
        cookieMC['cookieNumero'] = String(nuevoValor);
        res.cookie('cookieNumero', String(nuevoValor));
        console.log('ya existe una cookie1, valor actualizado');
        console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
      } else {
        res.cookie('cookieNumero', '100');
        cookieMC['cookieNumero'] = '100';
        res.send('Terminaste el juego, cookie seteada en 100');
      }
    }
    */
    return {
      parametrosRutaMC,
      resultadoSuma,
      cookieMC,
    };
  }

  @Post('resta')
  @HttpCode(200)
  resta(
    @Body() bodyParams,
    @Headers() cabecerasPeticion,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const parametrosdeCuerpoMC = bodyParams;
    const numero1 = Number(parametrosdeCuerpoMC['numero1'].toString());
    const numero2 = Number(parametrosdeCuerpoMC['numero2'].toString());

    const result = operacionesMC(res, req, 'resta', numero1, numero2);
    const resultadoResta = result.resultadoOperacion;
    const cookieMC = result.cookieMC;

    /*
    const resultadoRestaNumber: number = numero1 - numero2;
    const resultadoResta = String(resultadoRestaNumber);
    console.log(resultadoRestaNumber);
    const cookieMC = req.cookies;
    const valorCookie = cookieMC['cookieNumero'];
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    if (valorCookie == undefined) {
      const nuevoValor = 100 - resultadoRestaNumber;
      res.cookie(
        'cookieNumero', //Nombre
        String(nuevoValor), // Valor
      );
      cookieMC['cookieNumero'] = String(nuevoValor);
      console.log('Se seteo la cookie');
    } else {
      const nuevoValor = Number(valorCookie) - resultadoRestaNumber;
      if (nuevoValor > 0) {
        cookieMC['cookieNumero'] = String(nuevoValor);
        res.cookie('cookieNumero', String(nuevoValor));
        console.log('ya existe una cookie1, valor actualizado');
        console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
      } else {
        res.cookie('cookieNumero', '100');
        cookieMC['cookieNumero'] = '100';
        res.send('Terminaste el juego, cookie seteada en 100');
      }
    }

     */
    return {
      parametrosdeCuerpoMC,
      resultadoResta,
      cookieMC,
    };
  }

  @Put('multiplicacion')
  @HttpCode(200)
  multiplicacion(@Body() params, @Req() req, @Res({ passthrough: true }) res) {
    const parametrosMC = params;
    const numero1 = Number(parametrosMC['numero1'].toString());
    const numero2 = Number(parametrosMC['numero2'].toString());

    const result = operacionesMC(res, req, 'multiplicacion', numero1, numero2);
    const resultadoMultiplicacion = result.resultadoOperacion;
    const cookieMC = result.cookieMC;
    /*
    const resultadoRestaNumber: number = numero1 * numero2;
    const resultadoResta = String(resultadoRestaNumber);
    console.log(resultadoRestaNumber);
    const cookieMC = req.cookies;
    const valorCookie = cookieMC['cookieNumero'];
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    if (valorCookie == undefined) {
      const nuevoValor = 100 - resultadoRestaNumber;
      res.cookie(
        'cookieNumero', //Nombre
        String(nuevoValor), // Valor
      );
      cookieMC['cookieNumero'] = String(nuevoValor);
      console.log('Se seteo la cookie');
    } else {
      const nuevoValor = Number(valorCookie) - resultadoRestaNumber;
      if (nuevoValor > 0) {
        cookieMC['cookieNumero'] = String(nuevoValor);
        res.cookie('cookieNumero', String(nuevoValor));
        console.log('ya existe una cookie1, valor actualizado');
        console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
      } else {
        res.cookie('cookieNumero', '100');
        cookieMC['cookieNumero'] = '100';
        res.send('Terminaste el juego, cookie seteada en 100');
      }
    }

     */
    return {
      parametrosMC,
      resultadoMultiplicacion,
      cookieMC,
    };
  }

  @Get('division/:numero1/:numero2')
  @HttpCode(200)
  division(@Param() params, @Req() req, @Res({ passthrough: true }) res) {
    //function operacionesMC(res, req, operacion, numero1, numero2)
    const parametrosRutaMC = params;
    const numero1 = Number(parametrosRutaMC['numero1'].toString());
    const numero2 = Number(parametrosRutaMC['numero2'].toString());

    const result = operacionesMC(res, req, 'division', numero1, numero2);
    const resultadoDivision = result.resultadoOperacion;
    const cookieMC = result.cookieMC;
    /*
    const resultadoSumaNumber: number = numero1 + numero2;
    const resultadoSuma = resultadoSumaNumber.toString();
    const cookieMC = req.cookies;
    const valorCookie = cookieMC['cookieNumero'];
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    if (valorCookie == undefined) {
      const nuevoValor = 100 - resultadoSumaNumber;
      res.cookie(
        'cookieNumero', //Nombre
        String(nuevoValor), // Valor
      );
      cookieMC['cookieNumero'] = String(nuevoValor);
      console.log('Se seteo la cookie');
    } else {
      const nuevoValor = Number(valorCookie) - resultadoSumaNumber;
      if (nuevoValor > 0) {
        cookieMC['cookieNumero'] = String(nuevoValor);
        res.cookie('cookieNumero', String(nuevoValor));
        console.log('ya existe una cookie1, valor actualizado');
        console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
      } else {
        res.cookie('cookieNumero', '100');
        cookieMC['cookieNumero'] = '100';
        res.send('Terminaste el juego, cookie seteada en 100');
      }
    }
    */
    return {
      parametrosRutaMC,
      resultadoDivision,
      cookieMC,
    };
  }
}

function operacionesMC(res, req, operacion, numero1, numero2) {
  //const parametrosRutaMC = params;
  let resultadoOperacionNumber: number;

  const cookieMC = req.signedCookies;
  const valorCookie = cookieMC['cookieNumero'];

  switch (operacion) {
    case 'suma': {
      resultadoOperacionNumber = numero1 + numero2;
      break;
    }
    case 'resta': {
      resultadoOperacionNumber = numero1 - numero2;
      break;
    }
    case 'multiplicacion': {
      resultadoOperacionNumber = numero1 * numero2;
      break;
    }
    case 'division': {
      resultadoOperacionNumber = numero1 / numero2;
      break;
    }
  }

  if (valorCookie == undefined) {
    const nuevoValor = 100 - resultadoOperacionNumber;
    res.cookie(
      'cookieNumero', //Nombre
      String(nuevoValor), // Valor
      {
        signed: true,
      },
    );
    cookieMC['cookieNumero'] = String(nuevoValor);
    console.log('Se seteo la cookie');
  } else {
    const nuevoValor = Number(valorCookie) - resultadoOperacionNumber;
    if (nuevoValor > 0) {
      cookieMC['cookieNumero'] = String(nuevoValor);
      res.cookie('cookieNumero', String(nuevoValor), {
        signed: true,
      });
      console.log('ya existe una cookie1, valor actualizado');
      console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
    } else {
      res.cookie('cookieNumero', '100', {
        signed: true,
      });
      cookieMC['cookieNumero'] = '100';
      res.send('Terminaste el juego, cookie seteada en 100');
    }
  }
  const resultadoOperacion = String(resultadoOperacionNumber);
  return {
    cookieMC,
    resultadoOperacion,
  };
}
