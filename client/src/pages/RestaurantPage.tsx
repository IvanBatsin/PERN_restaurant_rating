import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { reviewApi } from '../api/reviewsApi';
import { AddReview } from '../components/AddReview';
import { Header } from '../components/Header';
import { Rating } from '../components/Rating';
import { Review } from '../components/Review';
import { useAlert } from '../context/AlertCtx';
import { useRestaurants } from '../context/RestaurantsCtx';
import { IReview, RestaurantRating } from '../interfaces';
import { getTotalRating } from '../utils/restaurantRating';

export const RestaurantsPage: React.FC = () => {
  const history = useHistory();
  const {currentRestaurant} = useRestaurants();
  const {showAlert} = useAlert();
  const {id} = useParams<{id: string}>()
  const [reviews, setReviews] = React.useState<IReview[]>([]);
  const [restaurantRating, setRestaurantRating] = React.useState<RestaurantRating>({
    totalRating: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  const addReview = (data: IReview): void => {
    setReviews(prevState => [data, ...prevState]);
    setRestaurantRating(getTotalRating([...reviews, data]));
  }

  const fetchReviews = async (): Promise<void> => {
    try {
      const {data} = await reviewApi.getAll(+id);
      setReviews(data);
      setLoading(false);
      setRestaurantRating(getTotalRating(data));
    } catch (error) {
      showAlert!(error.response.data.message);
    }
  }

  React.useEffect(() => {
    if (!currentRestaurant) {
      history.push('/');
    } else {
      fetchReviews();
    }
  }, []);

  if (loading) return <h2>Loading....</h2>

  return ( 
    <div className="container">
      <Header text={currentRestaurant?.name!}/>
      <div className="mb-4 d-flex justify-content-center align-items-center">
        <Rating rating={restaurantRating.totalRating}/>
        <span>({restaurantRating.totalReviews})</span>
      </div>
      <div className='row d-flex justify-content-center'>
        {reviews.length > 0 &&
          reviews.map(review => {
            return <Review key={review.id} review={review}/>
          })
        }
      </div>
        <AddReview addReview={addReview}/>
    </div>
  )
}