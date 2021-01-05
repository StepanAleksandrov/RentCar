import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import './cars.css';
import Card from '../components/Card';
import SideMenu from '../components/SideMenu';
import Pagination from '../components/Pagination';
import { filterCars, fetchCars } from '../store/actions/carsAction';

const Cars = (props: any) => {
  const distpatch = useDispatch();
  const location = 'kharkov';
  const city = props.params.location.state;
  const { filterItem: cars, cars: allCars, loading } = useSelector(
    (state: any) => state.cars
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(9);

  useEffect(() => {
    city !== '' ? distpatch(fetchCars(city)) : distpatch(fetchCars(location));
  }, [city, distpatch]);

  const sort = (sort_value: string) => {
    const sorted_array = cars.sort((a: any, b: any) => {
      const a_price = a.price_list[0];
      const b_price = b.price_list[0];

      if (sort_value === 'asc') {
        return a_price - b_price;
      } else if (sort_value === 'desc') {
        return b_price - a_price;
      }

      return a_price - b_price;
    });
    distpatch(filterCars(sorted_array));
  };

  const filteringByPrice = (arrayCars: any[], prices: any) => {
    return arrayCars.filter((car: any) => {
      if (prices.minPrice !== '' && prices.maxPrice !== '') {
        if (
          Number(Math.min(...car.price_list)) >= Number(prices.minPrice) &&
          Number(Math.min(...car.price_list)) <= Number(prices.maxPrice)
        ) {
          return car;
        }
      } else if (prices.minPrice === '' && prices.maxPrice !== '') {
        if (Number(prices.maxPrice) >= Number(Math.min(...car.price_list))) {
          return car;
        }
      } else if (prices.minPrice !== '' && prices.maxPrice === '') {
        if (Number(prices.minPrice) <= Number(Math.min(...car.price_list))) {
          return car;
        }
      } else if (prices.minPrice === '' && prices.maxPrice === '') {
        return car;
      }
    });
  };

  function filter(items: any) {
    const inputs = items[items.length - 1].getElementsByTagName('input');
    const prices = { minPrice: inputs[0].value, maxPrice: inputs[1].value };

    const filterAuto = { cars: allCars };
    let leng = 0;
    for (let i = 0; i < items.length; i++) {
      const checked: any[] = [];
      let inputs = {
        name: items[i].className,
        items: items[i].getElementsByTagName('input'),
      };

      for (let j = 0; j < inputs.items.length; j++) {
        if (inputs.items[j].checked) {
          checked.push(inputs.items[j].value);
        }
      }

      leng = leng + checked.length;

      if (checked.length > 0) {
        let edited_array: any[] = [];
        let array_elements = checked.map((val) => {
          return filterAuto.cars.filter((car: any) => {
            return car[inputs.name] === val;
          });
        });
        for (let k = 0; k < array_elements.length; k++) {
          edited_array = [...edited_array, ...array_elements[k]];
        }

        filterAuto.cars = filteringByPrice(edited_array, prices);
      }
    }

    if (leng > 0) {
      distpatch(filterCars(filterAuto.cars));
    } else if (leng === 0) {
      const cars = filteringByPrice(allCars, prices);
      distpatch(filterCars(cars));
    }
  }

  // Get current posts
  const indexOfLastCars = currentPage * carsPerPage;
  const indexOfFirstCars = indexOfLastCars - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCars, indexOfLastCars);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='menu'>
          <SideMenu filter={filter}></SideMenu>
        </div>
        <div className='center'>
          {loading ? (
            <Loader type='ThreeDots' color='#3b6978' height={100} width={100} />
          ) : (
            <div>
              <div className='sort'>
                <div>
                  <button onClick={() => sort('asc')}>
                    По возрастанию &uarr;
                  </button>
                </div>
                <div>
                  <button onClick={() => sort('desc')}>
                    По убыванию &darr;
                  </button>
                </div>
              </div>
              <Card cars={currentCars}></Card>
              <Pagination
                carsPerPage={carsPerPage}
                totalCars={cars.length}
                paginate={paginate}
                city={city}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
