import { getModelForClass, prop, pre } from '@typegoose/typegoose'
import { SchemaTypeOptions } from 'mongoose';


export class User {
    @prop({ required: true, unique: true, })
    public username: string;
    @prop({ required: true, unique: true, })
    public email: string;
    @prop({ required: true })
    public password: string;

}
export const UserModel=getModelForClass(User,{
    schemaOptions:{
        timestamps:true
    }
})