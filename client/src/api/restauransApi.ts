import axios from 'axios';
import { IRestaurant, ServerResponse } from '../interfaces';

interface ResponseRestaurantsAll {
  count: number,
  rows: IRestaurant[]
}

export interface CreateRestaurantPayload {
  name: string,
  location: string,
  priceRange: number
}

export const restaurantsApi = {
 async fetchRestaurants(): Promise<ServerResponse<ResponseRestaurantsAll>> {
    const {data} = await axios.get<ServerResponse<ResponseRestaurantsAll>>('/restaurants');
    return data;
  },

  async addRestaurant(payload: CreateRestaurantPayload): Promise<ServerResponse<IRestaurant>> {
    const {data} = await axios.post<ServerResponse<IRestaurant>>('/restaurants', payload);
    return data;
  },

  async deleteRestaurant(payload: number): Promise<ServerResponse<[]>> {
    const {data} = await axios.delete<ServerResponse<[]>>(`restaurants/${payload}`);
    return data;
  },

  async getRestaurant(payload: number): Promise<ServerResponse<IRestaurant>> {
    const {data} = await axios.get<ServerResponse<IRestaurant>>(`/restaurants/${payload}`);
    return data;
  },
  async updateRestaurant(id: number, payload: CreateRestaurantPayload): Promise<ServerResponse<IRestaurant>> {
    const {data} = await axios.put<ServerResponse<IRestaurant>>(`/restaurants/${id}`, payload);
    return data;
  }
}