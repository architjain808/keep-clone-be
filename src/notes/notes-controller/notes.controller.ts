import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from '../notes.entity';
import { CreateNoteDto } from '../notes.dto';
import { randomUUID } from 'crypto';

@Controller('notes')
export class NotesController {
  constructor(
    @InjectRepository(NoteEntity)
    private notesRepository: Repository<NoteEntity>,
  ) {}

  @Get()
  getAllNotes() {
    return this.notesRepository.find();
  }

  @Post('save')
  SaveNewNote(@Body() body: CreateNoteDto) {
    const note: Partial<NoteEntity> = {
      ...body,
      createdAt: new Date().toISOString(),
      id: randomUUID(),
    };
    return this.notesRepository.save(note);
  }

  @Post('update')
  async updateNote(@Body() body: CreateNoteDto) {
    if (!body.id) {
      throw new NotFoundException('ID is required');
    }
    const note = await this.notesRepository.findOneBy({ id: body.id });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.update(body.id, body);
    return 'UPDTAED';
  }
}
