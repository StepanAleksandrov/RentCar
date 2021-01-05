import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';

export interface CardProps {
  cars: Array<any>;
}

const Card = ({ cars }: CardProps) => {
  return (
    <div className='content'>
      {cars.map(
        (car) =>
          (
            <div key={car._id} className='card'>
              <div>
                <img src={car.imageUrl} alt='car' />
                <h3>{car.name}</h3>
                <p>{car.specific}</p>
                <p>
                  от &#8194;
                  <span
                    style={{ color: 'green', fontSize: 22, fontWeight: 500 }}
                  >
                    {`${car.price_list[0]}$`}
                  </span>
                </p>
              </div>
              <Link
                to={{
                  pathname: '/rent',
                  state: car,
                }}
              >
                <button className='button'>Выбрать</button>
              </Link>
            </div>
          ) || 'Error'
      )}
    </div>
  );
};

export default Card;
