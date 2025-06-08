import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from '../notes.entity';
import { CreateNoteDto } from '../notes.dto';
import { UUID, randomUUID } from 'crypto';
import { NotesGateway } from 'src/socket.gateway';

@Controller('notes')
export class NotesController {
  constructor(
    @InjectRepository(NoteEntity)
    private notesRepository: Repository<NoteEntity>,
    private notesGateway: NotesGateway,
  ) {}

  @Get()
  getAllNotes() {
    return this.notesRepository.find();
  }

  @Post('save')
  async SaveNewNote(@Body() body: CreateNoteDto) {
    const note: Partial<NoteEntity> = {
      ...body,
      createdAt: new Date().toISOString(),
      id: randomUUID(),
    };
   const savedNote = await this.notesRepository.save(note);
    const updatedNotes = await this.getAllNotes();
    this.notesGateway.sendNotesUpdate(updatedNotes);
    return savedNote;
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
    const updatedNotes = await this.getAllNotes();
    this.notesGateway.sendNotesUpdate(updatedNotes);
    // return note
    return { message: 'UPDTAED' };
  }

  @Post('delete')
  async deleteNote(@Body() body: { id: UUID }) {
    if (!body.id) {
      throw new NotFoundException('ID is required');
    }
    const note = await this.notesRepository.findOneBy({ id: body.id });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.delete(body.id);
    const updatedNotes = await this.getAllNotes();
    this.notesGateway.sendNotesUpdate(updatedNotes);
    return { message: 'NOTE DELETED' };
  }

  @Get('ping')
  getPing() {
    return { message: 'pong' };
  }
}
