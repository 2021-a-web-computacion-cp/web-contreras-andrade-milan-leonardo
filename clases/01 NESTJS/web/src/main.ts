import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParse = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');

  app.use(express.static('publico')); //Servidor Web Estatico
  app.use(cookieParse('Me agradan los poliperros')); //Secreto Cookies
  app.use(
    //Session
    session({
      name: 'server-session-id',
      secret: 'no sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );
  await app.listen(3000);
  //npm run start
}
bootstrap();

/*

abstract class Nombre {
  public nombrePropiedad?: string; //undefined
  private apellidoPropiedad = 'Contreras';
  protected edad = 1;
  static comun = 10;
  propiedadpublica: string;
  constructor(
    propiedadPublicaParametro: string,
    public propiedadRapido: string,
  ) {
    this.propiedadpublica = propiedadPublicaParametro;
    this.propiedadRapido;
  }

  public funcionPublica(parametroString: string): void {
    //no hay return = undefined
  }

  private funcionPrivada(parametroString: string, parametroNumber?: number) {
    // :void por defecto
    //no hay return = undefined
  }

  protected funcionPublica(): number {
    return 1;
  }

  static funcionEstatica(): string {
    return 'string';
  }
}


// TIPOS DE VARIABLES

// MUTABLES (reasignar -> =)
let variableUno = 1; //NO USAMOS VAR
let variableDos = 2;
variableUno = 3;
variableDos = 4;

//INMUTABLES (No se pueden reasignar X -> !=)
const variableTres = 5;
// variableTres = 2; //Error!

// VARIABLES PRIMITIVAS
const texto = ''; // ""
const numeroEntero = 1;
const numeroFlotante = 1.2;
const soyEstudiante = true; //false
const noDefinido = undefined;
const noHayNada = null;
const fecha: Date = new Date();
//Duck Typing
const cualquierCosa: any = 'Vicente';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}
const usuario: Usuario = new Usuario('Adrian', 'Eguez');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; // ?=> Opcional // valor por defecto es undefined
}

const objetoUsuario: UsuarioInterface = {
  nombre: 'Milan',
  apellido: 'Contreras',
};
objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;
console.log(usuario);
console.log(objetoUsuario);

//PUNTEROS REFERENCIA

//PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua; //VALOR
edadAntigua += 1; //23
otraEdad -= 1; //21

//Objeto
const objetoEdad = {
  edad: 22,
};

const otraEdadObjeto = objetoEdad; //REFERENCIA
otraEdadObjeto.edad = otraEdadObjeto.edad + 1; //23
console.log(otraEdadObjeto.edad);
objetoEdad.edad; //23
console.log(otraEdadObjeto.edad);
objetoEdad.edad = objetoEdad + 1; //24
otraEdadObjeto.edad; //24

const otraEdadObjetoClonado = { ...objetoEdad }; //Clonacion Objetos

const arregloEjemplo = [123];
const arregloClonado = [...arregloEjemplo];

//ARREGLOS

const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3, 4, 5];

function funcionConNombre() {}

const indice = arregloNumeros.findIndex((numero) => {
  const elValorEsIgualATres: boolean = numero === 3;
  return elValorEsIgualATres; //condicio boolean
});

arregloNumeros[indice] = 6;
//agregar al final
arregloNumeros.push(6);
//agregar al principio
arregloNumeros.unshift(0);

//CONDICIONES -> truty y falsy
if (0) {
  console.log('Truty');
} else {
  console.log('Falsy'); //falsy
}

if (1) {
  console.log('Truty'); //truty
} else {
  console.log('Falsy');
}

if (-1) {
  console.log('Truty'); //truty
} else {
  console.log('Falsy');
}


if ("") {
  console.log('Truty');
} else {
  console.log('Falsy');//falsy
}

if ("a") {
  console.log('Truty'); //truty
} else {
  console.log('Falsy');
}

if ({}) {
  console.log('Truty');
} else {
  console.log('Falsy');//falsy
}

if ({a:1}) {
  console.log('Truty'); //truty
} else {
  console.log('Falsy');
}


if ([]) {
  console.log('Truty');
} else {
  console.log('Falsy');//falsy
}

if ([1]) {
  console.log('Truty'); //truty
} else {
  console.log('Falsy');
}


if (null) {
  console.log('Truty');
} else {
  console.log('Falsy');//falsy
}

if (undefined) {
  console.log('Truty');
} else {
  console.log('Falsy');//falsy
}

 */
