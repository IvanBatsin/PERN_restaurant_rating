import axios from 'axios';
import { CreateReviewForm } from '../components/AddReview';
import { IReview, ServerResponse } from '../interfaces';

export const reviewApi = {
  async getAll(id: number): Promise<ServerResponse<IReview[]>> {
    const {data} = await axios.get<ServerResponse<IReview[]>>(`/reviews/${id}`);
    return data;
  },

  async create(payload: CreateReviewForm): Promise<ServerResponse<IReview>> {
    const {data} = await axios.post<ServerResponse<IReview>>('/reviews', payload);
    return data;
  }
}