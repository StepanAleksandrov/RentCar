import React from 'react';
import './sideMenu.css';

const gearType = ['Механика', 'Автомат'];
const goalType = ['Бензин', 'Дизель', 'Электро'];
const carcass = [
  'Седан',
  'Хэтчбек',
  'Кроссовер',
  'Внедорожник',
  'Минивен',
  'Универсал',
];

const SideMenu = ({ filter }: any) => {
  const renderItems = (array: any) => {
    return array.map((item: string, index: number) => (
      <li key={index}>
        <input type='checkbox' name={item} value={item} />
        {item}
      </li>
    ));
  };

  return (
    <div
      className='sideMenu'
      onChange={(event) =>
        filter(event.currentTarget.getElementsByTagName('ul'))
      }
    >
      <button className='showfilter'>Показать фильтры</button>
      <div className='block'>
        <div className='head'>Тип Кузова</div>
        <div style={{ padding: '10px' }}>
          <ul className='carcass'>{renderItems(carcass)}</ul>
        </div>
      </div>
      <div className='block'>
        <div className='head'>Тип Коробки</div>
        <div style={{ padding: '10px' }}>
          <ul className='transmission_type'>{renderItems(gearType)}</ul>
        </div>
      </div>
      <div className='block'>
        <div className='head'>Тип Топлива</div>
        <div style={{ padding: '10px' }}>
          <ul className='fuel_type'>{renderItems(goalType)}</ul>
        </div>
      </div>
      <div className='block'>
        <div className='head'>Цена</div>
        <div style={{ padding: '10px' }}>
          <ul className='price'>
            <label htmlFor='_minPrice'>от &#8194;</label>
            <input
              className='inputPrice'
              type='number'
              id='_minPrice'
              name='minPrice'
              defaultValue='20'
              placeholder='20'
            />
            <label htmlFor='_maxPrice'>до &#8194;</label>
            <input
              className='inputPrice'
              type='number'
              id='_maxPrice'
              name='maxPrice'
              defaultValue='222'
              placeholder='222'
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
