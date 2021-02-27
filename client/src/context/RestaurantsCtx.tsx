import React from 'react';
import { IRestaurant } from '../interfaces';
import { CreateRestaurantPayload, restaurantsApi } from '../api/restauransApi';
import { useAlert } from './AlertCtx';

interface RestaurantsContextProps {
  restaurants: IRestaurant[],
  currentRestaurant: IRestaurant | undefined,
  selectCurrentRestaurant: (id: number) => void,
  fetchRestaurants: () => Promise<void>,
  addRestaurant: (payload: CreateRestaurantPayload) => Promise<void>
  deleteRestaurant: (payload: number) => Promise<void>,
  fetchCurrentRestaurant: (payload: number) => Promise<void>,
  updateRestaurant: (id: number, payload: CreateRestaurantPayload) => Promise<void>
}

const RestaurantsContext = React.createContext<Partial<RestaurantsContextProps>>({});

export const RestaurantContextProvider: React.FC = ({children}) => {
  const [restaurants, setRestaurants] = React.useState<IRestaurant[]>([]);
  const [currentRestaurant, setCurrentRestaurant] = React.useState<IRestaurant | undefined>(undefined);
  const {showAlert} = useAlert();

  const fetchRestaurants = async (): Promise<void> => {
    try {
      const {data} = await restaurantsApi.fetchRestaurants();
      setRestaurants(data.rows);
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  }

  const addRestaurant = async (form: CreateRestaurantPayload): Promise<void> => {
    try {
      const {data} = await restaurantsApi.addRestaurant(form);
      setRestaurants(prevState => [data, ...prevState]);
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  }

  const deleteRestaurant = async (id: number): Promise<void> => {
    try {
      if (window.confirm('Delete this restaurant?')) {
        setRestaurants(prevState => prevState.filter(restaurant => restaurant.id !== id));
        await restaurantsApi.deleteRestaurant(id);
      }
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  }

  const fetchCurrentRestaurant = async (id: number): Promise<void> => {
    try {
      const {data} = await restaurantsApi.getRestaurant(id);
      setCurrentRestaurant(data);
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  }

  const updateRestaurant = async (id: number, payload: CreateRestaurantPayload): Promise<void> => {
    try {
      const {data} = await restaurantsApi.updateRestaurant(id, payload);
      setRestaurants(prevState => prevState.map(restaurant => restaurant.id === data.id ? data : restaurant));
    } catch (error) {
      console.log(error);
      showAlert!(error.response.data.message);
    }
  }

  const selectCurrentRestaurant = (id: number): void => {
    const selectedRestaurant = restaurants.find(restaurant => restaurant.id === id);
    if (!selectedRestaurant) {
      showAlert!('We have a error', 'info');
    } else {
      setCurrentRestaurant(selectedRestaurant);
    }
  }

  const value: RestaurantsContextProps = {
    restaurants, 
    currentRestaurant, 
    fetchRestaurants, 
    addRestaurant, 
    deleteRestaurant, 
    fetchCurrentRestaurant,
    updateRestaurant,
    selectCurrentRestaurant
  };

  return (
    <RestaurantsContext.Provider value={value}>
      {children}
    </RestaurantsContext.Provider>
  )
}

export const useRestaurants = () => React.useContext(RestaurantsContext);