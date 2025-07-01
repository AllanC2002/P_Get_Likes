import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from './publication.schema';

@Injectable()
export class GetLikesService implements OnModuleInit {
  constructor(
    @InjectModel(Publication.name) //
    private readonly publicationModel: Model<PublicationDocument>,
  ) {}

  async onModuleInit() {
    console.log('Colleccion:', this.publicationModel.collection.name);
  }

  async getLikesByPublicationId(id: string): Promise<string[]> {
    const publication = await this.publicationModel.findById(id).exec();

    if (!publication) {
      throw new NotFoundException('Publication not found');
    }

    return publication.Likes ?? [];
  }
}
