import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update.dto';
import { AuthRole } from 'src/decorators/role.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/approved')
  @AuthRole('manager')
  async getReviewsNotApproved(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.reviewService.getReviewsNotApproved(+pageNumber, +pageSize);
  }


  @Get('/:tour_id')
  async getReviewsByTour(@Param('tour_id') tour_id: string, @Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    if (isNaN(+tour_id)) throw new BadRequestException('Invalid tour_id parameter');
    return this.reviewService.getReviewsByTour(+tour_id, +pageNumber, +pageSize);
  }

  @Get()
  @Auth()
  async getReviewsByUser(@CurrentUser('user_id') id: number, @Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.reviewService.getReviewsByUser(id, +pageNumber, +pageSize);
  }

  @Get('/user/:review_id')
  @Auth()
  async getReview(@CurrentUser('user_id') id: number,  @Param('review_id') review_id: string) {
    if (isNaN(+review_id)) throw new BadRequestException('Invalid review_id parameter');
    return this.reviewService.getReviewByUser(id, +review_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createReview(@CurrentUser('user_id') id: number, @Body() dto: ReviewDto) {
    return this.reviewService.createReview(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateReview(@CurrentUser('user_id') id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewService.updateReview(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/approve/:review_id')
  @Auth()
  @AuthRole('manager')
  async approveReview(  @Param('review_id') review_id: string) {
    return this.reviewService.approveReview(+review_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":review_id")
  @Auth()
  async deleteReview(@CurrentUser('user_id') id: number, @Param('review_id') review_id: string) {
    if (isNaN(+review_id)) throw new BadRequestException('Invalid review_id parameter');
    return this.reviewService.deleteReview(id, +review_id);
  }
}
