import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJSON(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
    suma(params: any, req: any, res: any): {
        parametrosRutaMC: any;
        resultadoSuma: string;
        cookieMC: any;
    };
    resta(bodyParams: any, cabecerasPeticion: any, req: any, res: any): {
        parametrosdeCuerpoMC: any;
        resultadoResta: string;
        cookieMC: any;
    };
    multiplicacion(params: any, req: any, res: any): {
        parametrosMC: any;
        resultadoMultiplicacion: string;
        cookieMC: any;
    };
    division(params: any, req: any, res: any): {
        parametrosRutaMC: any;
        resultadoDivision: string;
        cookieMC: any;
    };
}
