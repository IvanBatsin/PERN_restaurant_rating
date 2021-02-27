import React from 'react';
import { Header } from '../components/Header';
import { RestaurantUpdateForm } from '../components/UpdateRestaurantForm';

export const UpdatePage: React.FC = () => {
  return (
    <div className="container">
      <Header text={'Update restaurant'}/>
      <RestaurantUpdateForm/>
    </div>
  )
}