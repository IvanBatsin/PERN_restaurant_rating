import { param, body } from 'express-validator';

export const getAllReviews = [
  param('restaurantId', 'Restaurant Id is required')
    .isString().withMessage('Restaurant Id format must be string')
    .notEmpty().withMessage('Restaurant Id format is invalid')
];

export const createReview = [
  body('name', 'Name is required')
    .isString().withMessage('Name must be string')
    .notEmpty().withMessage('Name is required'),

  body('text', "Text is required")
    .isString().withMessage('Text must be string')
    .notEmpty().withMessage('Text is required'),

  body('rating', 'Rating is requried')
    .isNumeric().withMessage('Rating must be number')
    .notEmpty().withMessage('Rating is requried'),

  body('restaurantId', 'Restaurant id is required')
    .isNumeric().withMessage('Restaurant id must be number')
    .notEmpty().withMessage('Restaurant id is requried')
];