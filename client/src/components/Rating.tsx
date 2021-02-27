import React from 'react';

interface RatingProps {
  rating: number
}

export const Rating: React.FC<RatingProps> = ({rating}: RatingProps) => {
  const stars: string[] = [];
  for(let i=0; i<5; i++) {
    const temp = Math.floor(rating)
    if (i < temp) {
      stars.push('fa fa-star');
    } else if (i === temp) {
      stars.push(!Number.isInteger(rating) ? 'fa fa-star-half-o' : 'fa fa-star-o');
    } else {
      stars.push('fa fa-star-o');
    }
  }
  return (
    <>
      {stars.map((star, index) => {
        return <i key={index} className={star} aria-hidden="true" style={{color: '#ffc107'}}></i>
      })}
    </>
  )
}