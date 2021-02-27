import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Restaurant, Review } from '../models/models';
import { HttpError } from '../utils/httpError';

class RestaurantController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const restaraunts = await Restaurant.findAndCountAll({order: [['createdAt', 'DESC']], include: [{
        model: Review
      }]});
      res.json({status: 'success', data: restaraunts});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const {id} = req.params;
      const restaraunt = await Restaurant.findOne({where: {id}});
      res.json({status: 'success', data: restaraunt});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HttpError(400, errors.array()[0].msg));
      }

      const {name, location, priceRange} = req.body;
      const restaraunt = await Restaurant.create({location, priceRange, name});
      res.status(201).json({status: 'success', data: restaraunt});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HttpError(400, errors.array()[0].msg));
      }
      
      const {id} = req.params;
      const {name, location, priceRange} = req.body;

      const restaurant = await Restaurant.update({name, location, priceRange}, {where: {id}, returning: true});
      res.json({status: 'success', data: restaurant[1][0]});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const {id} = req.params;
      if (!id) {
        return next(new HttpError(400, 'Restaurant id is required'));
      }

      await Restaurant.destroy({where: {id}});
      res.json({status: 'success', data: []});
    } catch (error) {
      console.log(error);
      return next(new HttpError());
    }
  }
}

export const restaurantController = new RestaurantController();