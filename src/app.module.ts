import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'books',
      entities: [Book],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
