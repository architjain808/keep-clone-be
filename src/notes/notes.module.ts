import { Module } from '@nestjs/common';
import { NotesController } from './notes-controller/notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './notes.entity';
import { NotesGateway } from 'src/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NotesController],
  providers: [NotesGateway],
})
export class NotesModule {}
