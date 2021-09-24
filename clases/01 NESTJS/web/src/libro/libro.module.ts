import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    LibroService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    LibroService,
  ],
  controllers: [
    // declaramos controladores
    LibroController,
  ],
})
export class LibroModule {}
