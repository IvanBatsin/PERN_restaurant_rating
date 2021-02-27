import { IReview, RestaurantRating } from "../interfaces";

export const getTotalRating = (reviews: IReview[]): RestaurantRating => {
  if (!reviews.length) {
    return {
      totalRating: 0,
      totalReviews: 0
    };
  }

  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((accum, item) => accum += item.rating, 0) / totalReviews;
  return {totalRating, totalReviews};
}