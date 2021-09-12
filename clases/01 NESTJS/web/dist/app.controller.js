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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML</h1>';
    }
    holaJSON() {
        return '{mensaje: "Hola json"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galleta Segura', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
    suma(params, req, res) {
        const parametrosRutaMC = params;
        const numero1 = Number(parametrosRutaMC['numero1'].toString());
        const numero2 = Number(parametrosRutaMC['numero2'].toString());
        const result = operacionesMC(res, req, 'suma', numero1, numero2);
        const resultadoSuma = result.resultadoOperacion;
        const cookieMC = result.cookieMC;
        return {
            parametrosRutaMC,
            resultadoSuma,
            cookieMC,
        };
    }
    resta(bodyParams, cabecerasPeticion, req, res) {
        const parametrosdeCuerpoMC = bodyParams;
        const numero1 = Number(parametrosdeCuerpoMC['numero1'].toString());
        const numero2 = Number(parametrosdeCuerpoMC['numero2'].toString());
        const result = operacionesMC(res, req, 'resta', numero1, numero2);
        const resultadoResta = result.resultadoOperacion;
        const cookieMC = result.cookieMC;
        return {
            parametrosdeCuerpoMC,
            resultadoResta,
            cookieMC,
        };
    }
    multiplicacion(params, req, res) {
        const parametrosMC = params;
        const numero1 = Number(parametrosMC['numero1'].toString());
        const numero2 = Number(parametrosMC['numero2'].toString());
        const result = operacionesMC(res, req, 'multiplicacion', numero1, numero2);
        const resultadoMultiplicacion = result.resultadoOperacion;
        const cookieMC = result.cookieMC;
        return {
            parametrosMC,
            resultadoMultiplicacion,
            cookieMC,
        };
    }
    division(params, req, res) {
        const parametrosRutaMC = params;
        const numero1 = Number(parametrosRutaMC['numero1'].toString());
        const numero2 = Number(parametrosRutaMC['numero2'].toString());
        const result = operacionesMC(res, req, 'division', numero1, numero2);
        const resultadoDivision = result.resultadoOperacion;
        const cookieMC = result.cookieMC;
        return {
            parametrosRutaMC,
            resultadoDivision,
            cookieMC,
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('/texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    common_1.Get('/html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    common_1.Get('/json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJSON", null);
__decorate([
    common_1.Get('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    common_1.Get('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    common_1.Get('setear-cookie-insegura'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    common_1.Get('mostrar-cookie'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    common_1.Get('parametros-de-consulta/:nombre/:apellido'),
    common_1.HttpCode(200),
    common_1.Header('Cache-Control', 'none'),
    common_1.Header('EPN', 'SISTEMAS'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    common_1.Post('parametros-de-cuerpo'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
__decorate([
    common_1.Get('suma/:numero1/:numero2'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "suma", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __param(2, common_1.Req()),
    __param(3, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    common_1.Put('multiplicacion/:numero1/:numero2'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    common_1.Get('division/:numero1/:numero2'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
function operacionesMC(res, req, operacion, numero1, numero2) {
    let resultadoOperacionNumber;
    const cookieMC = req.cookies;
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
        res.cookie('cookieNumero', String(nuevoValor));
        cookieMC['cookieNumero'] = String(nuevoValor);
        console.log('Se seteo la cookie');
    }
    else {
        const nuevoValor = Number(valorCookie) - resultadoOperacionNumber;
        if (nuevoValor > 0) {
            cookieMC['cookieNumero'] = String(nuevoValor);
            res.cookie('cookieNumero', String(nuevoValor));
            console.log('ya existe una cookie1, valor actualizado');
            console.log('Nuevo Valor: ' + cookieMC['cookieNumero']);
        }
        else {
            res.cookie('cookieNumero', '100');
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
//# sourceMappingURL=app.controller.js.map