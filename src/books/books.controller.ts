import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from 'src/create-book.dto';
import { Book } from 'src/book.entity';
import { UpdateBookDto } from 'src/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/books')
export class BooksController {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.repository.findOne(id);
  }

  @Post()
  async create(@Body() input: CreateBookDto) {
    return await this.repository.save({
      ...input,
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateBookDto) {
    const book = await this.repository.findOne(id);

    return await this.repository.save({
      ...book,
      ...input,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const book = await this.repository.findOne(id);
    await this.repository.remove(book);
  }
}
