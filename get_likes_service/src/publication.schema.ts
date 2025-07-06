import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicationDocument = Publication & Document;

@Schema({ collection: 'Publications' })
export class Publication {
  @Prop()
  Id_user: number;

  @Prop()
  Text: string;

  @Prop({ type: [{ name: String, url: String, type: String }] })
  Multimedia: { name: string; url: string; type: string }[];

  @Prop()
  Status: number;

  @Prop()
  Datepublish: Date;

  @Prop([String])
  Likes: string[];
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);


