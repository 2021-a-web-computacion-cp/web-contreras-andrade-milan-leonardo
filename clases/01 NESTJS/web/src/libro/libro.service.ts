import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LibroService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}

  buscarUno(id: number) {
    return this.prisma.libro.findUnique({
      where: {
        id: id,
      },
    });
  }

  buscarMuchos(parametrosBusqueda: {
    skip?: number;
    take?: number;
    busqueda?: string;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { autor: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.libro.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  crearUno(libro: Prisma.LibroCreateInput) {
    return this.prisma.libro.create({
      data: libro,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.LibroUpdateInput;
  }) {
    return this.prisma.libro.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.libro.delete({
      where: { id: id },
    });
  }
}
