import { db } from '../core/db';
import { DataTypes } from 'sequelize';
import { RestaurantInstance, RestaurantProps, ReviewInstance, ReviewProps } from '../interface/modelInterfaces';
  
export const Restaurant = db.define<RestaurantInstance, RestaurantProps>('restaurant', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.TEXT, allowNull: false},
  location: {type: DataTypes.STRING, allowNull: false},
  priceRange: {type: DataTypes.INTEGER, defaultValue: 0, validate: {
    max: 5,
    min: 0
  }}
}, {timestamps: true});

export const Review = db.define<ReviewInstance, ReviewProps>('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.INTEGER, allowNull: false, validate: {
    max: 5, min: 1
  }},
  text: {type: DataTypes.TEXT, allowNull: false}
});

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);