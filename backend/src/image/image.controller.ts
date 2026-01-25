import { Controller, Get, HttpCode, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/:id')
  async GetImageById(@Param('id') id: string, @Res() res) {
    const image = await this.imageService.GetImageById(id);
    if (!image) throw new NotFoundException("Image not found");

    res.setHeader('Content-Type', image.mimetype); 
    res.send(image.data);
  }

  @Get('/type/:total/:type')
  async GetImagesByType(@Param('total') total: string, @Param('type') type: string) {
    if (type !== 'tour' && type !== 'hotel' && type !== 'country')
      throw new NotFoundException("Type gonna be 'tour', 'hotel' or 'country'");

    return this.imageService.GetImagesByType(+total, type);
  }

  @Post()
  @HttpCode(200)
  @Auth()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        cb(new Error('Only images allowed'), false);
      }
      cb(null, true);
    },
  }))
  async AddImage(@UploadedFile() file: Express.Multer.File, @CurrentUser('user_id') id: number) {
    return this.imageService.AddNewImage(file, id);
  }
}
