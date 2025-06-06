import { Module } from '@nestjs/common';
import { NotesController } from './notes-controller/notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './notes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity])],
    controllers: [NotesController],
    providers: [],
})
export class NotesModule {}
