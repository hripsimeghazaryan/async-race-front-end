import React, { ReactNode, createContext, useState, useEffect } from 'react';
import requests from '../utils/resuests';
import Car from '../interfaces/Car';

type GarageType = {
    cars: Car[];
}
export const GarageDataContext = createContext<GarageType | null>(null);

export const GarageProvider = ({ children }: { children: ReactNode}) => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const getCars = async () => {
            const response = await requests.getCars().then((data) => setCars(data));
        }
        getCars();
    }, [])

    return (
        <GarageDataContext.Provider value={{cars: cars}}>{children}</GarageDataContext.Provider>
    )
}

