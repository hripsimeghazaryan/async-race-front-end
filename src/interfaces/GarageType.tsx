import Car from "./Car"
import CreateCar from "./CreateCar"

export type GarageType = {
    cars: Car[];
    createCar: (carData: CreateCar) => void;
    deleteCar: (id: number) => void;
}