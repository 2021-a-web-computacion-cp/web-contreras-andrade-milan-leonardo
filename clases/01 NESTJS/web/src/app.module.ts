import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsuarioModule } from './usuario/usuario.module';
import { LibroModule } from './libro/libro.module';

// DECORADOR -> Funciones
@Module({
  imports: [
    // Modulos importados
    UsuarioModule,
    LibroModule,
  ],
  controllers: [
    // Controladores de este modulo
    AppController,
  ],
  providers: [
    // Servicios de este modulo
    AppService,
    PrismaService,
  ],
  exports: [
    // Servicios EXPORTADOS (que se pueden usar fuera de este modulo)
    AppService,
  ],
})
export class AppModule {}
