/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import Car from './Car';
import CreateCar from './CreateCar';
import Pagination from './Pagination';

export type GarageType = {
    cars: Car[];
    createCar: (carData: CreateCar) => void;
    deleteCar: (id: number) => void;
    updateCar: (id: number, carData: CreateCar) => void;
    pagination: Pagination;
    changePagination: (page: number, limit: number) => void;
}
