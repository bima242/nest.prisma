import { PartialType } from '@nestjs/swagger'; // PASTIKAN DARI @nestjs/swagger
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}