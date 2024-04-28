import {
  ReactNode, createContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import requests from '../utils/requests';
import CreateCar from '../interfaces/CreateCar';
import Car from '../interfaces/Car';
import Pagination from '../interfaces/Pagination';
import { GarageType } from '../interfaces/GarageType';
import { carBrands, carClass } from '../constants/CarConstants';

export const GarageDataContext = createContext<GarageType | null>(null);

export function GarageProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 7,
    total: 0,
  });

  const getCars = useCallback(async () => {
    const response = await requests.getCars(pagination.page, pagination.limit);
    const { data, total } = response;
    setCars(data);
    setPagination((prev) => ({ ...prev, total }));
  }, [pagination]);

  useEffect(() => {
    getCars();
  }, [pagination.page]);

  const updateList = useCallback(async () => {
    const response = await requests.getCars(pagination.page, pagination.limit);
    const { data, total } = response;
    setCars(data);
    setPagination((prev) => ({ ...prev, total }));
  }, [pagination]);

  const createCar = useCallback(async (carData: CreateCar) => {
    const response = await requests.createCar(carData);
    updateList();
  }, [updateList]);

  const deleteCar = useCallback(async (id: number) => {
    const response = await requests.deleteCar(id);
    updateList();
  }, [updateList]);

  const updateCar = useCallback(async (id: number, carData: CreateCar) => {
    const response = await requests.updateCar(id, carData);
    updateList();
  }, [updateList]);

  const changePagination = useCallback(async (page: number, limit: number) => {
    if (page !== pagination.page || limit !== pagination.limit) {
      const response = await requests.getCars(page, limit);
      const { data } = response;
      setCars(data);
      setPagination((prev) => ({ ...prev, page }));
    }
  }, [pagination]);

  const updatePosition = useCallback((position: number) => {
    cars.forEach((car) => {
      const elem = document.getElementById(`${car.id}`);
      if (elem) {
        elem.style.left = `${position}px`;
      }
    });
  }, [cars]);

  const generateCar = () => {
    const brandIndex = Math.floor(Math.random() * carBrands.length);
    const classIndex = Math.floor(Math.random() * carClass.length);
    const name = `${carBrands[brandIndex]} ${carClass[classIndex]}`;
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return { name, color };
  };

  const generateCars = useCallback(async (count: number) => {
    for (let i = 0; i < count; i += 1) {
      const { name, color } = generateCar();
      const carData: CreateCar = {
        name,
        color,
      };
      createCar(carData);
    }
  }, [createCar]);

  const garageValueProps = useMemo(
    () => ({
      cars,
      createCar,
      deleteCar,
      updateCar,
      pagination,
      changePagination,
      generateCars,
      updatePosition,
    }),
    [cars, pagination, createCar, deleteCar,
      updateCar, changePagination, generateCars, updatePosition],
  );

  return (
    <GarageDataContext.Provider value={garageValueProps}>
      {children}
    </GarageDataContext.Provider>
  );
}
