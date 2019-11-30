import { Injectable, NotFoundException } from '@nestjs/common';
import { createToDoDto } from './dtos/create-toDo.dto';
import { ToDo } from './interfaces/toDo.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel('toDo') private readonly toDoModel: Model<ToDo>) {}

  async createToDoItem(createToDoItemto: createToDoDto): Promise<{}> {
    const newToDo = new  this.toDoModel(createToDoItemto);
    const result = await newToDo.save();
    return result;
  }

     async getToDos(){
        const result = await this.toDoModel.find().exec();
        return result;
      }

      async getSingleToDo(ToDoId :string){
        const result = await this.findToDoItem(ToDoId);
        return result;
      }


      private async findToDoItem(id :string){
        const toDoItem =  await this.toDoModel.findById(id);

        if(!toDoItem){
          throw new NotFoundException('There is no item with this id.');

        }
        return  toDoItem;
      }

      async updateToDo(toDoId: string, checked: boolean, desc: string){
        const toDoItem = await this.findToDoItem(toDoId);
        if(checked != null){
          toDoItem.checked = checked;
        }

        if(desc){
          toDoItem.text = desc;
        }

        toDoItem.save();
      }

      async deleteToDoItem(toDoId: string){
        const result = await this.toDoModel.deleteOne({_id: toDoId}).exec();
        if(result.n === 0){
          throw new NotFoundException('Could not find an item with this id');
        }
      }

        async deleteCheckedItems(){
          const result = await this.toDoModel.deleteMany({checked: true});
          if(result.n ===0){
            throw new NotFoundException('There are no checked items to delete');
          }
        }

   }




