import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
// import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://IstrateLaurentiu:steaua1947@cluster0-kjxop.mongodb.net/test?retryWrites=true&w=majority',
    ),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
