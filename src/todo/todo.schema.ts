import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDoc = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.methods.toJSON = function () {
  const todoObject = this.toObject();

  todoObject.id = todoObject._id;

  delete todoObject.__v;
  delete todoObject._id;

  return todoObject;
};
