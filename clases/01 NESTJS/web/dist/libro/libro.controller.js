"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibroController = void 0;
const common_1 = require("@nestjs/common");
const libro_service_1 = require("./libro.service");
const class_validator_1 = require("class-validator");
const libro_crear_dto_1 = require("./dto/libro-crear.dto");
const libro_editar_dto_1 = require("./dto/libro-editar.dto");
let LibroController = class LibroController {
    constructor(libroService) {
        this.libroService = libroService;
    }
    inicio(response) {
        response.render('inicio');
    }
    async listaLibros(response, parametrosConsulta) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('libro/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async crearUsuarioFormualrio(response, parametrosCuerpo) {
        let flag = false;
        if (parametrosCuerpo.leido != undefined) {
            flag = true;
        }
        const libroCrearDto = new libro_crear_dto_1.LibroCrearDto();
        libroCrearDto.nombre = parametrosCuerpo.nombre;
        libroCrearDto.autor = parametrosCuerpo.autor;
        libroCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        libroCrearDto.calificacion = +parametrosCuerpo.calificacion;
        libroCrearDto.leido = flag;
        try {
            const errores = await class_validator_1.validate(libroCrearDto);
            if (errores.length > 0 || libroCrearDto.calificacion > 10) {
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                await this.libroService.crearUno(libroCrearDto);
                response.redirect('/libro/vista-crear' +
                    '?mensaje= Se creo el usuario ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando libro');
        }
    }
    async editarLibro(response, parametrosCuerpo, parametrosRuta) {
        let flag = false;
        if (parametrosCuerpo.leido != undefined) {
            flag = true;
        }
        console.log('Llegue aqui 1');
        console.log(parametrosCuerpo.fechaCreacion);
        console.log(new Date(parametrosCuerpo.fechaCreacion));
        const libroEditarDto = new libro_editar_dto_1.LibroEditarDto();
        libroEditarDto.nombre = parametrosCuerpo.nombre;
        libroEditarDto.autor = parametrosCuerpo.autor;
        libroEditarDto.fechaCreacion = new Date(parametrosCuerpo.fechaCreacion);
        libroEditarDto.calificacion = +parametrosCuerpo.calificacion;
        libroEditarDto.leido = flag;
        try {
            const errores = await class_validator_1.validate(libroEditarDto);
            if (errores.length > 0 || libroEditarDto.calificacion > 10) {
                throw new common_1.BadRequestException('No envia bien parametros: ');
            }
            else {
                console.log('Llegue aqui 2');
                console.log(parametrosCuerpo.fechaCreacion);
                console.log(new Date(parametrosCuerpo.fechaCreacion));
                await this.libroService.actualizarUno({
                    id: +parametrosRuta.idLibro,
                    data: libroEditarDto,
                });
                console.log('Llegue aqui 3');
                response.redirect('/libro/lista-libros' +
                    '?mensaje= Se actualizo el Libro ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error actualizando libro');
        }
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const respuesta = await this.libroService.buscarUno(+parametrosRuta.idLibro);
            response.render('libro/editar', {
                datos: {
                    libro: respuesta,
                    id: +parametrosRuta.idLibro,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async eliminarLibro(response, parametrosRuta) {
        try {
            await this.libroService.eliminarUno(+parametrosRuta.idLibro);
            response.redirect('/libro/lista-libros' + '?mensaje=Se elimino al usuario');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "inicio", null);
__decorate([
    common_1.Get('lista-libros'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "listaLibros", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LibroController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('crear-libro-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "crearUsuarioFormualrio", null);
__decorate([
    common_1.Post('editar-libro-formulario/:idLibro'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "editarLibro", null);
__decorate([
    common_1.Post('editar-libro/:idLibro'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "vistaEditar", null);
__decorate([
    common_1.Post('eliminar-libro/:idLibro'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LibroController.prototype, "eliminarLibro", null);
LibroController = __decorate([
    common_1.Controller('libro'),
    __metadata("design:paramtypes", [libro_service_1.LibroService])
], LibroController);
exports.LibroController = LibroController;
//# sourceMappingURL=libro.controller.js.map