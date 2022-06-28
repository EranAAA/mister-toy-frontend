import React from "react";

import { RatingStar } from "rating-star";

export function RateWithStar({saveStar, stars}) {
  const [rating, setRating] = React.useState(0);

  const onRatingChange = val => {
    setRating(val);
    saveStar(val)
  }; 

  return (
    <div >
      <RatingStar
        id="clickable"
        clickable
        rating={rating}
        onRatingChange={onRatingChange}
      />
    </div>
  );
}