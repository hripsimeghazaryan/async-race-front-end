import { ReactNode, createContext, useState, useEffect } from 'react';
import requests from '../utils/resuests';
import Car from '../interfaces/Car';
import CreateCar from '../interfaces/CreateCar';
import { GarageType } from '../interfaces/GarageType';

export const GarageDataContext = createContext<GarageType | null>(null);

export const GarageProvider = ({ children }: { children: ReactNode}) => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const getCars = async () => {
            const response = await requests.getCars().then((data) => setCars(data));
        }
        getCars();
    }, [])

    const createCar = async (carData: CreateCar) => {
        const response = await requests.createCar(carData);
    }

    const deleteCar = async (id: number) => {
        const response = await requests.deleteCar(id);
    }

    const updateCar = async (id: number, carData: CreateCar) => {
        const response = await requests.updateCar(id, carData);
    }
      
    return (
        <GarageDataContext.Provider value={{cars, createCar, deleteCar, updateCar}}>{children}</GarageDataContext.Provider>
    )
}

