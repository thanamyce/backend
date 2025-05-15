import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRole {
  ADMIN = 'ADMIN',
  CO_ADMIN = "CO_ADMIN",
  USER = 'USER',
  SUPERVISOR = 'SUPERVISOR',
  DESIGNER = 'DESIGNER'
}

export type UserDocument = User & Document;
@Schema({timestamps: true})
export class User{
   
  @Prop()
  _id: string;
  
  @Prop({ required: true, unique: true })
  email: string;

  // Make password optional or allow it to be null
  @Prop({ required: false })
  password: string; // You can make it required false if you want to delete it in some scenarios

  @Prop({ required: true }) // Make firstName mandatory
  firstName: string;

  @Prop({ required: true }) // Make lastName mandatory
  lastName: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({default:false})
  isAdmin: boolean;
  
  @Prop()
  otp: string;  // Store OTP as a string

  @Prop()
  otpExpiresAt: Date;  // Store OTP expiration time

  @Prop({ default: null })  // ✅ Add refresh token field
  refreshToken?: string; // Store hashed refresh token

  @Prop({ default: null })
  mfaSecret: string;
}

export const UserSchema = SchemaFactory.createForClass(User);