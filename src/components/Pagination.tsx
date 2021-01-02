import React from "react";
import { Link } from "react-router-dom";

export interface PaginationProps {
  carsPerPage: number;
  totalCars: number;
  paginate: (number: number) => void;
  city: string;
}

const Pagination = ({
  carsPerPage,
  totalCars,
  paginate,
  city,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to={{
                pathname: `/cars/${city}`,
                state: `${city}`,
              }}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
