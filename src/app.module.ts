import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './notes/notes.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.CONNECTION_STRING,
      entities: [NoteEntity], // Explicitly register the entity
      autoLoadEntities: true, // Keep this as well
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
