import { LibroService } from './libro.service';
export declare class LibroController {
    private libroService;
    constructor(libroService: LibroService);
    inicio(response: any): void;
    listaLibros(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearUsuarioFormualrio(response: any, parametrosCuerpo: any): Promise<void>;
    editarLibro(response: any, parametrosCuerpo: any, parametrosRuta: any): Promise<void>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    eliminarLibro(response: any, parametrosRuta: any): Promise<void>;
}
