import { RoleEnum } from '@prisma/client';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { UserService } from 'src/user/user.service';
import { UpdateReviewDto } from './dto/update.dto';

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getReviewsByTour(tour_id: number, pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    const reviews = await this.prisma.review.findMany({where: {tour_id, is_approved: true},
      orderBy: {created_at: 'desc'},
      take: pageSize, skip,
      include: {user: {select: {email: true}}}
    });
    const rev = reviews.map(review => ({...review, user: {username: review.user.email.split('@')[0]}}));

    const total = await this.prisma.review.count({where: {tour_id, is_approved: true}});
    return {reviews: rev, total};
  }

  async getReviewsNotApproved(pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    const reviews = await this.prisma.review.findMany({
      where: {is_approved: false},
      take: pageSize, skip,
    });
    const total = await this.prisma.review.count({where: {is_approved: false}});
    return {reviews, total};
  }

  async getReviewsByUser(user_id: number, pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    const reviews = await this.prisma.review.findMany({where: {user_id}, take: pageSize, skip, include: {user: {select: {email: true}}}});
    const total = await this.prisma.review.count({where: {user_id}});

    const rev = reviews.map(review => ({...review, user: {username: review.user.email.split('@')[0]}}));

    return {reviews: rev, total};
  }

  async getReviewByUser(user_id: number, review_id: number) {
    return this.prisma.review.findFirst({where: {review_id, user_id}});
  }

  async createReview(user_id: number, dto: ReviewDto) {
    return this.prisma.review.create({data: {...dto, user_id: user_id}});
  }

  async updateReview(user_id: number, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findFirst({
      where: { user_id, review_id: dto.review_id },
    });
  
    if (!review) throw new ForbiddenException('Access denied: not this user try delete review.');

    return this.prisma.review.update({where: {review_id: dto.review_id, user_id}, data: {
      ...dto, is_approved: false
    }});
  }

  async deleteReview(user_id: number, review_id: number) {
    const review = await this.prisma.review.findFirst({
      where: { user_id, review_id },
    });
    const role = await this.userService.getUserRole(user_id);

    if (!review || role !== RoleEnum.manager) throw new ForbiddenException('Access denied: not this user try delete review.');
    
    await this.prisma.review.delete({where: {review_id, user_id}});
    return review;
  }

  async approveReview(review_id: number) {
    return this.prisma.review.update({where: {review_id}, data: {
      is_approved: true
    }});
  }
}
