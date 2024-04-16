import { useState } from "react";
import { FaCarSide } from "react-icons/fa6";
import Button from "./Button";
import Car from "../interfaces/Car";
import requests from "../utils/resuests";
import './RacingLine.css';

function RacingLine({name, color, id}: Car) {
    // const [car, setCar] = useState<Car[]>();
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [isMoving, setIsMoving] = useState(false);


    const changeColor = (id: number): void => {
        // changes color of selected car
        // setCar((prev) => prev?.map(elem => (elem.id === id) ? {...elem, color: "purple"} : elem))  
    }

    const selectCar = (id: number): void => {
        // setIsSelected(id)
    }

    const deleteCar = (id: number): void => {
        const response = requests.deleteCar(id);
    }

    return (
            <div key={id} className={`line-container ${isSelected === id ? 'selected' : ''}`}>
                <div className="line line-dir">
                    <div className="side-btn-container">
                        <Button title="Select" onClick={() => selectCar(id)} />
                        <Button title="Delete" onClick={() => deleteCar(id)} />
                    </div>
                    <div className="side-btn-container race-btn">
                        <Button title="Start" onClick={() => selectCar(id)} />
                        <Button title="Stop" onClick={() => changeColor(id)} />
                    </div>
                    <div className="car">
                        <FaCarSide fontSize="2em" color={color}/>
                    </div>
                    <span className="car-name">{name}</span>
                </div>
            </div>
    )

} 

export default RacingLine