import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './notes/notes.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('CONNECTION_STRING'),
        entities: [NoteEntity],
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false, // Helps with some cloud database providers
        },
        retryAttempts: 5,
        retryDelay: 3000,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
