import { useState, useContext } from "react";
import { FaCarSide } from "react-icons/fa6";
import Button from "./Button";
import Car from "../interfaces/Car";
import { GarageType } from "../interfaces/GarageType";
import { GarageDataContext } from "../contexts/garage-data";
import './RacingLine.css';

type Props = {
    car: Car,
    select: boolean,
    onSelect: (id: number) => void
}

function RacingLine({car, select, onSelect}: Props) {
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const { deleteCar } = useContext(GarageDataContext) as GarageType;

    const changeColor = (id: number): void => {
        // changes color of selected car
        // setCar((prev) => prev?.map(elem => (elem.id === id) ? {...elem, color: "purple"} : elem))  
    }

    const selectCar = (id: number): void => {
        setIsSelected(id)
    }

    const handleDelete = (id: number): void => {
        deleteCar(id);
    }

    return (
            <div key={car.id} className={`line-container ${select ? 'selected' : ''}`}>
                <div className="line line-dir">
                    <div className="side-btn-container">
                        <Button title="Select" onClick={() => onSelect(car.id)} />
                        <Button title="Delete" onClick={() => handleDelete(car.id)} />
                    </div>
                    <div className="side-btn-container race-btn">
                        <Button title="Start" onClick={() => selectCar(car.id)} />
                        <Button title="Stop" onClick={() => changeColor(car.id)} />
                    </div>
                    <div className="car">
                        <FaCarSide fontSize="2em" color={car.color}/>
                    </div>
                    <span className="car-name">{car.name}</span>
                </div>
            </div>
    )

} 

export default RacingLine