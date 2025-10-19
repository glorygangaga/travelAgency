import { Controller } from '@nestjs/common';
import { BlogpostService } from './blogpost.service';

@Controller('blogpost')
export class BlogpostController {
  constructor(private readonly blogpostService: BlogpostService) {}
}
