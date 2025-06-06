import { Test, TestingModule } from '@nestjs/testing';
import { NotesControllerController } from './notes.controller';

describe('NotesControllerController', () => {
  let controller: NotesControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesControllerController],
    }).compile();

    controller = module.get<NotesControllerController>(NotesControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
