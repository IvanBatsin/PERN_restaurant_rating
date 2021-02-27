import React from 'react';
import { useAlert } from '../context/AlertCtx';
import { useRestaurants } from '../context/RestaurantsCtx';
import { useForm } from '../hook/useForm';
import { validateForm } from '../utils/validateForm';

export const AddRestaurant: React.FC = () => {
  const { showAlert } = useAlert();
  const { addRestaurant } = useRestaurants();
  const {form, handleChangeForm, setForm} = useForm({
    location: '',
    name: '',
    priceRange: 1
  });

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (validateForm(form)) {
      await addRestaurant!(form);
      setForm({
        location: '',
        name: '',
        priceRange: 0
      });
    } else {
      console.log('form is invalid');
      showAlert!('Form is invalid', 'danger');
    }
  }

  return ( 
    <div className="mt-4 p-1">
      <form onSubmit={handleSubmitForm}>
        <div className="row">
          <div className="col-4">
            <input type="text" value={form.name} className="form-control" onChange={event => handleChangeForm(event.target.name, event.target.value)} name="name" placeholder="Restaurant name" required/>
          </div>
          <div className="col-4">
            <input type="text" value={form.location} className="form-control" onChange={event => handleChangeForm(event.target.name, event.target.value)} name="location" placeholder="Restaurant location" required/>
          </div>
          <div className="col-3">
            <select className="form-select" onChange={event => handleChangeForm(event.target.name, event.target.value)} name="priceRange">
              <option disabled>Price range</option>
              <option value={1}>$</option>
              <option value={2}>$$</option>
              <option value={3}>$$$</option>
              <option value={4}>$$$$</option>
              <option value={5}>$$$$$</option>
            </select>
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}