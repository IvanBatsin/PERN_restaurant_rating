import { Model } from 'sequelize';

interface ModelBase{
  id?: number,
  createdAt?: string,
  updatedAt?: string,
}

// Restaraunt model
export interface RestaurantProps extends ModelBase {
  name: string,
  location: string,
  priceRange: number
}
export interface RestaurantInstance extends Model<RestaurantProps>, RestaurantProps {};


// Review model
export interface ReviewProps extends ModelBase {
  text: string,
  name: string,
  rating: number,
  restaurantId?: number
}
export interface ReviewInstance extends Model<ReviewProps>, ReviewProps {};