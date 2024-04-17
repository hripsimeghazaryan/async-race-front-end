/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import {
  ReactNode, createContext, useState, useEffect,
} from 'react';
import requests from '../utils/requests';
import Car from '../interfaces/Car';
import CreateCar from '../interfaces/CreateCar';
import Pagination from '../interfaces/Pagination';
import { GarageType } from '../interfaces/GarageType';

export const GarageDataContext = createContext<GarageType | null>(null);

export function GarageProvider({ children }: { children: ReactNode}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 7,
    total: 0,
  });

  useEffect(() => {
    const getCars = async () => {
      const response = await requests.getCars(pagination.page, pagination.limit);
      const { data, total } = response;
      setCars(data);
      setPagination({ ...pagination, total });
    };
    getCars();
  }, []);

  const createCar = async (carData: CreateCar) => {
    const response = await requests.createCar(carData);
  };

  const deleteCar = async (id: number) => {
    const response = await requests.deleteCar(id);
    const newData = await requests.getCars(pagination.page, pagination.limit);
    const { data, total } = newData;
    setCars(data);
    setPagination({ ...pagination, total });
  };

  const updateCar = async (id: number, carData: CreateCar) => {
    const response = await requests.updateCar(id, carData);
  };

  const changePagination = async (page: number, limit: number) => {
    const response = await requests.getCars(page, limit);
    const { data } = response;
    setCars(data);
    setPagination({ ...pagination, page });
  };

  const generateCar = () => {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const generateCars = async (count: number) => {

  };

  return (
    <GarageDataContext.Provider value={{
      cars, createCar, deleteCar, updateCar, pagination, changePagination,
    }}
    >
      {children}
    </GarageDataContext.Provider>
  );
}
