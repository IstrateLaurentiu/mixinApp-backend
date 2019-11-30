import { Controller, Post, Body, Get,Put, Param, Delete } from '@nestjs/common';
import { create } from 'domain';
import { createToDoDto } from './dtos/create-toDo.dto';
import { TodoService } from './todo.service';

@Controller('toDo')
export class TodoController {
  constructor(private readonly toDoService: TodoService) {}
  @Post()
  create(@Body() createToDoDto: createToDoDto) {
    return this.toDoService.createToDoItem(createToDoDto);
  }

  @Get()
  async getAllToDos(){
    const toDos = await this.toDoService.getToDos();
    return toDos;
  }

  @Get(':id')
  getToDo(@Param('id') toDoId: string){
    return this.toDoService.getSingleToDo(toDoId);
  }

  @Put(':id')
  async updateToDo(
    @Param('id') toDoId: string,
    @Body('checked') checked: boolean,
    @Body('text') description: string
  ){
     await this.toDoService.updateToDo(toDoId,checked,description);
         return null;
  }

  @Delete(':id')
  async removeToDo(@Param('id') toDoId: string){
     await this.toDoService.deleteToDoItem(toDoId);
      return null;
  }

  @Delete()
  async removeCheckedToDos(){
    await this.toDoService.deleteCheckedItems();
    return null;
  }


}
