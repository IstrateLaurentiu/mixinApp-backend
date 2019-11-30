import * as mongoose from 'mongoose'
export interface ToDo extends mongoose.Document {
  checked: boolean;
  text: string;
}
