import { body } from 'express-validator';

export const createRestaurant = [
  body('name', 'Name is required')
    .isString().withMessage('Invalid name format')
    .notEmpty().withMessage('Name is required')
    .trim(),

  body('location', 'Location is required')
    .isString().withMessage('Invalid location format')
    .notEmpty().withMessage('Location is required')
    .trim(),

  body('priceRange', 'Price range is required')
    .isNumeric().withMessage('Invalid price range format')
    .notEmpty().withMessage('Price range is required')
    .custom((value) => {
      if (value < 0 || value > 5) {
        throw new Error('Invalid price range value (0-5)')
      }
      return value;
    })
];

export const updateRestaurant = [
  body('name').optional()
    .isString().withMessage('Invalid name format')
    .notEmpty().withMessage('Name is required')
    .trim(),

  body('location').optional()
    .isString().withMessage('Invalid location format')
    .notEmpty().withMessage('Location is required')
    .trim(),

  body('priceRange').optional()
    .isNumeric().withMessage('Invalid price range format')
    .custom((value) => {
      if (value < 0 || value > 5) {
        throw new Error('Invalid price range value (0-5)')
      }
      return value;
    })
]