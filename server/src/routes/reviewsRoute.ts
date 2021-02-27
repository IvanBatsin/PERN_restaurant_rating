import { Router } from 'express';
import { reviewsController } from '../controllers/reviewController';
import { createReview, getAllReviews, } from '../validators/reviewValidator';
const reviewsRouter: Router = Router();

reviewsRouter.get('/:restaurantId', getAllReviews, reviewsController.index);
reviewsRouter.post('/', createReview, reviewsController.create);

export { reviewsRouter };