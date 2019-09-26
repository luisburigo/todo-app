import {Document, model, Schema} from 'mongoose'

export enum TodoStatus {
    COMPLETED,
    WORKING,
    NOT_COMPLETED
}

export interface ITodoModel {
    name: string,
    status: TodoStatus,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

export interface ITodoSchema extends Document {

}

const schema = new Schema({
    name: {
        type: String
    },
    status: {
        type: Number,
        default: TodoStatus.NOT_COMPLETED
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
});

schema.pre('save', function (next) {
   console.log(this);
   next();
});

export const TodoSchema = model<ITodoSchema>('todo', schema);
