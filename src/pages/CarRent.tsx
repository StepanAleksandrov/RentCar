import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { sendOrder } from '../store/actions/carsAction';
import axios from 'axios';

const CarRent = (props: any) => {
  const car = props.params.location.state;
  const { creation } = useSelector((state: any) => state.cars);
  let history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    startRent: startDate,
    endRent: endDate,
    car: car,
    priceRent: `${car.price_list[0]}$`,
  });

  const sendMessage = async () => {
    const data = {
      ...order,
      startRent: startDate.toISOString(),
      endRent: endDate.toISOString(),
    };

    const resp = await axios.post('http://localhost:3000/rent/create', data);
    dispatch(sendOrder(resp.data));
    if (resp.data.creation === 'creation') {
      history.push('/thanks');
    }
  };

  return (
    <div className='wrapper'>
      <div className='container center'>
        <div className='details'>
          <div className='car_image'>
            <div key={car._id}>
              <div>
                <img src={car.imageUrl} width='400px' alt='car' />
              </div>
            </div>
          </div>
          <div className='car_info'>
            <h3>{car.name}</h3>
            <p>
              Тип кузова: <span>{car.carcass}</span>
            </p>
            <p>
              Двигатель: <span>{car.engine_capacity}</span>
            </p>
            <p>
              Тип коробки: <span>{car.transmission_type}</span>
            </p>
            <p>
              Тип топлива: <span>{car.fuel_type}</span>
            </p>
          </div>
          <div className='car_prices'>
            <h3>Цены</h3>
            <p>
              <b>от</b> 24 суток{' '}
              <span>
                {car.price_list[0]}
                <b>$</b>
              </span>
            </p>
            <p>
              10-23 суток{' '}
              <span>
                {car.price_list[1]}
                <b>$</b>
              </span>
            </p>
            <p>
              4-9 суток{' '}
              <span>
                {car.price_list[2]}
                <b>$</b>
              </span>
            </p>
            <p>
              1-3 суток{' '}
              <span>
                {car.price_list[3]}
                <b>$</b>
              </span>
            </p>
          </div>
        </div>
        <div className='order'>
          <label htmlFor='_firstName'>Имя</label>
          <input
            type='text'
            name='firstName'
            id='_firstName'
            placeholder='Введите имя'
            required
            onChange={(text) => {
              setOrder({ ...order, firstName: text.currentTarget.value });
            }}
          />
          <label htmlFor='_lastName'>Фамилия</label>
          <input
            type='text'
            name='lastName'
            id='_lastName'
            placeholder='Введите фамилию'
            required
            onChange={(text) => {
              setOrder({ ...order, lastName: text.currentTarget.value });
            }}
          />
          <label htmlFor='_phone'>Номер телефона</label>
          <input
            type='text'
            name='phone'
            id='_phone'
            placeholder='+38(96)781637'
            required
            onChange={(text) => {
              setOrder({ ...order, phone: text.currentTarget.value });
            }}
          />
          <label htmlFor='_endDate'>Дата начала аренды</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              setOrder({ ...order, startRent: date });
            }}
            minDate={new Date()}
            selectsStart
            startDate={startDate}
            required
            endDate={endDate}
          />
          <label htmlFor='_startDate'>Дата окончания аренды</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date);
              setOrder({ ...order, endRent: date });
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            required
            minDate={startDate}
          />
          {creation === 'no creation' ? <b>Даты заняты</b> : null}

          <button className='button' onClick={sendMessage}>
            Арендовать
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarRent;
