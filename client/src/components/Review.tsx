import React from 'react';
import { IReview } from '../interfaces';
import { Rating } from './Rating';

interface ReviewProps {
  review: IReview
}

export const Review: React.FC<ReviewProps> = ({ review }: ReviewProps) => {
  return (  
    <div className="card text-white bg-primary mb-3 me-4 col-4" style={{maxWidth: '30%'}}>
      <div className="card-header d-flex justify-content-between">
        {review.name}
        <span>{review.rating}</span>
        <span><Rating rating={review.rating}/></span>
      </div>
      <div className="card-body">
        <p className="card-text">{review.text}</p>
      </div>
    </div>
  )
}