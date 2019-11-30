import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { toDoSchema } from './schemas/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'toDo', schema: toDoSchema }])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
