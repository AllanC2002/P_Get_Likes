import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GetLikesController } from './get-likes.controller';
import { GetLikesService } from './get-likes.service';
import { Publication, PublicationSchema } from './publication.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTIP}:${process.env.MONGO_PORT}`,
        dbName: process.env.MONGO_DB,
      }),
    }),
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  controllers: [GetLikesController],
  providers: [GetLikesService],
})
export class AppModule {}
