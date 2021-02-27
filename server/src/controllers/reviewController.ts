import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';
import { Restaurant, Review } from '../models/models';
import { validationResult } from 'express-validator';

class ReviewController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HttpError(401, errors.array()[0].msg));
      }

      const {restaurantId} = req.params;
      const reviews = await Review.findAll({where: {restaurantId}});
      res.json({status: 'success', data: reviews});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HttpError(401, errors.array()[0].msg));
      }

      const {name, text, rating, restaurantId} = req.body;

      const condidate = Restaurant.findByPk(restaurantId);

      if (!condidate) {
        return next(new HttpError(404, 'Restaurant with this id not found'));
      }

      const review = await Review.create({name, rating, text, restaurantId});
      res.json({status: 'success', data: review});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }
}

export const reviewsController = new ReviewController;