import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class LibroService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__LibroClient<import(".prisma/client").Libro>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Libro[]>;
    crearUno(libro: Prisma.LibroCreateInput): Prisma.Prisma__LibroClient<import(".prisma/client").Libro>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.LibroUpdateInput;
    }): Prisma.Prisma__LibroClient<import(".prisma/client").Libro>;
    eliminarUno(id: number): Prisma.Prisma__LibroClient<import(".prisma/client").Libro>;
}
