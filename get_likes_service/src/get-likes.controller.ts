import { Body, Controller, Post } from '@nestjs/common';
import { GetLikesService } from './get-likes.service';

@Controller('get-likes')
export class GetLikesController {
  constructor(private readonly getLikesService: GetLikesService) {}

  @Post()
  async getLikes(@Body('id') idPublication: string) {
    const likes = await this.getLikesService.getLikesByPublicationId(idPublication);
    return { likes, count: likes.length };
  }
}
