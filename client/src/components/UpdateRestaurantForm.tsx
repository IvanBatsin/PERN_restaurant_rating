import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAlert } from '../context/AlertCtx';
import { useRestaurants } from '../context/RestaurantsCtx';
import { useForm } from '../hook/useForm';
import { validateForm } from '../utils/validateForm';
import { Spinner } from './Spinner';

export const RestaurantUpdateForm: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const history = useHistory();
  const { currentRestaurant, fetchCurrentRestaurant, updateRestaurant } = useRestaurants();
  const {showAlert} = useAlert();
  const {setForm, handleChangeForm, form} = useForm({
    location: '',
    name: '',
    priceRange: 0
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (validateForm(form)) {
      await updateRestaurant!(+id, form);
      history.push('/');
    } else {
      showAlert!('All fields must be entered', 'danger');
    }
  }

  React.useEffect(() => {
    fetchCurrentRestaurant!(+id);
  }, []);

  React.useEffect(() => {
    if (currentRestaurant !== undefined) {
      setForm(currentRestaurant);
    }
  }, [currentRestaurant]);
 
  if (!currentRestaurant) return <Spinner/>
  return (
    <div>
      <form className="mt-4" onSubmit={event => handleFormSubmit(event)}>
        <div className="form-group mt-2">
          <label htmlFor="name">Restaurant Name</label>
          <input type="text" value={form.name} onChange={event => handleChangeForm(event.target.name, event.target.value)} className="form-control" id="name" name="name" placeholder="Restaurant name"/>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="location">Restaurant Location</label>
          <input type="text" value={form.location} onChange={event => handleChangeForm(event.target.name, event.target.value)} className="form-control" id="location" name="location" placeholder="Restaurant location" required/>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="name">Price Range</label>
          <input type="number" value={form.priceRange} onChange={event => handleChangeForm(event.target.name, event.target.value)} className="form-control" id="name" name="name" placeholder="Restaurant name" max={5} min={1} required/>
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', marginTop: 10}}>
          <button onClick={() => history.push('/')} className="btn btn-danger">Back</button>
          <button type="submit" className="btn btn-primary ms-1">Update</button>
        </div>
      </form>
    </div>
  )
}