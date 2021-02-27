import React from 'react';
import { AddRestaurant } from '../components/AddRestaurant';
import { Header } from '../components/Header';
import { RestaurantsList } from '../components/RestaurantsList';

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Header text={'Restaurant Finder'}/>
      <AddRestaurant/>
      <RestaurantsList/>
    </div>
  )
}