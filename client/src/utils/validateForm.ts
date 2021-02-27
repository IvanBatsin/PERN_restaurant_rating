import { CreateRestaurantPayload } from "../api/restauransApi";

export const validateForm = (payload: CreateRestaurantPayload): boolean => {
  let isValid = true;
  type PyaloadKeys = keyof CreateRestaurantPayload;
  (Object.keys(payload) as PyaloadKeys[]).forEach(item => {
    if (item === 'location' && !payload[item].length || item === 'name' && !payload[item].length) {
      isValid = isValid && false;
    }

    if (item === 'priceRange' && payload[item] < 0 || payload[item] > 5) {
      isValid = isValid && false;
    }
  });
  
  return isValid;
}