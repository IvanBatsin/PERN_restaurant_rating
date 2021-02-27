import { Router} from 'express';
import { restaurantController } from '../controllers/restaurantController';
import { createRestaurant, updateRestaurant } from '../validators/restaurantValidator';
const restaurantRouter: Router = Router();

restaurantRouter.get('/', restaurantController.index);
restaurantRouter.get('/:id', restaurantController.getItem);
restaurantRouter.post('/', createRestaurant, restaurantController.create);
restaurantRouter.put('/:id', updateRestaurant, restaurantController.update);
restaurantRouter.delete('/:id', restaurantController.delete);

export { restaurantRouter }