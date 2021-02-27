import React from 'react';
import { useParams } from 'react-router-dom';
import { reviewApi } from '../api/reviewsApi';
import { useAlert } from '../context/AlertCtx';
import { IReview } from '../interfaces';

interface AddReviewProps {
  addReview: (data: IReview) => void
}

export interface CreateReviewForm {
  name: string,
  text: string,
  rating: number,
  restaurantId: number
}

export const AddReview: React.FC<AddReviewProps> = ({addReview}: AddReviewProps) => {
  const {id} = useParams<{id: string}>();
  const {showAlert} = useAlert();
  const [form, setForm] = React.useState<CreateReviewForm>({
    name: '',
    rating: 1,
    restaurantId: +id,
    text: ''
  });

  const handleFormChange = (name: string, value: string | number): void => {
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const {data} = await reviewApi.create(form);
      addReview(data);
      setForm(prevState => ({ ...prevState, name: '', rating: 1, text: ''}));
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  } 

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input className="form-control" value={form.name} onChange={event => handleFormChange(event.target.name, event.target.value)} type="text" id="name" name="name" placeholder="Name" required/>
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating (1-5)</label>
            <input type="number" defaultValue={1} name="rating" onChange={event => handleFormChange(event.target.name, +event.target.value)} id="rating" className="form-control" placeholder="Rating" max={5} min={1} required/>
          </div>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="review">Review</label>
          <textarea className="form-control" value={form.text} onChange={event => handleFormChange(event.target.name, event.target.value)} name="text" id="review" style={{resize: 'none'}} required/>
        </div>
        <div className="mt-2 d-flex justify-content-end">
          <button className='btn btn-primary'>Add Review</button>
        </div>
      </form>
    </div>
  )
}