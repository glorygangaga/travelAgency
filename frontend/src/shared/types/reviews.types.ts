export type ReviewType = {
  tour_id: number;
  user_id: number;
  created_at: Date;
  review_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
}

export type getReviewTypeResponse = ReviewType[];

export type createReviewType = {
  tour_id: number,
  rating: number,
  comment: string;
};

export type updateReviewType = {
  review_id: number,
  rating: number;
  comment: string;
};

export type approveReviewType = {
  review_id: number;
  is_approved: boolean;
}

export type getReviewsListType = {
  reviews: ReviewType[];
  total: number;
}