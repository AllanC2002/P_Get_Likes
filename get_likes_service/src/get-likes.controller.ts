import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GetLikesService } from './get-likes.service';

@Controller('get-likes')
export class GetLikesController {
  constructor(private readonly getLikesService: GetLikesService) {}

  @Post()
  async getLikes(@Body('id') idPublication: string, @Res() res: Response) {
    const likes = await this.getLikesService.getLikesByPublicationId(idPublication);
    return res.status(HttpStatus.OK).json({ likes, count: likes.length });
  }
}