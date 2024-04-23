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
    generateCars: (count: number) => void;
    updatePosition: (position: number) => void;
}
