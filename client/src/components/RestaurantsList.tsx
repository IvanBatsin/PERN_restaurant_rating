import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRestaurants } from '../context/RestaurantsCtx';
import { getTotalRating } from '../utils/restaurantRating';
import { Rating } from './Rating';

export const RestaurantsList: React.FC = () => {
  const {restaurants, fetchRestaurants, deleteRestaurant, selectCurrentRestaurant} = useRestaurants();
  const history = useHistory();

  const handleEditClick = (event: React.FormEvent<HTMLButtonElement>, id: number): void => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  }

  const handleDeleteClick = (event: React.FormEvent<HTMLButtonElement>, id: number): void => {
    event.preventDefault();
    event.stopPropagation();
    deleteRestaurant!(id);
  }

  const handleRestaurantClick = (id: number) => {
    selectCurrentRestaurant!(id);
    history.push(`/restaurants/${id}`);
  }

  React.useEffect(() => {
    fetchRestaurants!();
  }, []);

  return (
    <div className="list-group mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th className="col">Name</th>
            <th className="col">Location</th>
            <th className="col">Rating</th>
            <th className="col">Price range</th>
            <th className="col">Edit</th>
            <th className="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants?.map(restaurant => {
            return (
              <tr key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>
                  <div>
                    {restaurant.reviews! && restaurant.reviews!.length > 0 ?
                      <>
                        <Rating rating={getTotalRating(restaurant.reviews!).totalRating}/>
                        <span> ({getTotalRating(restaurant.reviews!).totalReviews})</span>
                      </>
                    :
                      <span>No reviews</span>
                    }
                  </div>
                </td>
                <td>${restaurant.priceRange}</td>
                <td><button onClick={event => handleEditClick(event, restaurant.id)} className="btn btn-outline-warning">Edit</button></td>
                <td><button onClick={event => handleDeleteClick!(event, restaurant.id)} className="btn btn-outline-danger">Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}