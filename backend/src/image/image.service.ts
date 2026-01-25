import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImageService {
  constructor (
    private prisma: PrismaService
  ) {}

  async GetImageById(id: string) {
    return this.prisma.image.findUnique({where: {image_id: +id}, select: {mimetype: true, data: true }});
  }

  async AddNewImage(file: Express.Multer.File, user_id: number) {
    await this.DeleteImages(user_id, 'user');
    return this.AddImage(file, user_id, 'user');
  }

  async AddImage(file: Express.Multer.File, id: number, type: 'tour' | 'hotel' | 'country' | 'user') {
    const user_id = type === 'user' ? id : null;
    const hotel_id = type === 'hotel' ? id : null;
    const country_id = type === 'country' ? id : null;
    const tour_id = type === 'tour' ? id : null;

    const image = await this.prisma.image.create({
      data: {
        data: file.buffer,
        mimetype: file.mimetype,
        user_id, hotel_id,
        country_id, tour_id
      }
    });

    return image.image_id;
  }

  async DeleteImages(id: number, type: 'tour' | 'hotel' | 'country' | 'user') {
    const user_id = type === 'user' ? id : null;
    const hotel_id = type === 'hotel' ? id : null;
    const country_id = type === 'country' ? id : null;
    const tour_id = type === 'tour' ? id : null;

    const images = await this.prisma.image.findMany({where: {user_id, hotel_id, country_id, tour_id}});

    if (images.length > 0)
      {
        for (let i = 0; i < images.length; i++)
          await this.prisma.image.delete({where: {image_id: images[i].image_id}});
      }
  }

  async GetImagesByType(total: number, type: 'tour' | 'hotel' | 'country') {
    const whereMap = {
      tour: { tour_id: { not: null } },
      hotel: { hotel_id: { not: null } },
      country: { country_id: { not: null } },
    };
  
    return this.prisma.image.findMany({
      take: total,
      where: whereMap[type],
      select: {image_id: true}
    });
  }
}
