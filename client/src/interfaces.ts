export interface IRestaurant {
  id: number
  name: string,
  location: string,
  priceRange: number,
  createdAt?: string,
  updatedAt?: string,
  reviews?: IReview[]
}

export interface ServerResponse<Data> {
  status: 'error' | 'success',
  data: Data
}

export type AlertTypes = 'success' | 'danger' | 'info';
export interface AlertProps {
  text: string,
  type: AlertTypes
}

export interface IReview {
  id: number,
  name: string,
  text: string,
  rating: number,
  restaurantId: number,
  createdAt?: string,
  updatedAt?: string
}

export interface RestaurantRating {
  totalReviews: number,
  totalRating: number
}