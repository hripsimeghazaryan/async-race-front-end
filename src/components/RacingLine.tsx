import { useState, useEffect } from "react";
import requests from "../utils/resuests";
import { FaCarSide } from "react-icons/fa6";
import Button from "./Button";
import './RacingLine.css';
import { title } from "process";

interface Car {
    name: string,
    color: string,
    id: number
}

function RacingLine() {
    const [car, setCar] = useState<Car[]>();
    const [isSelected, setIsSelected] = useState<number | null>(null);

    useEffect(() => {
        const get = async () => {
            const data = await requests.getCars();
            setCar(data)
        }
        get();
    }, []);

    const changeColor = (id: number): void => {
        // changes color of selected car
        setCar((prev) => prev?.map(elem => (elem.id === id) ? {...elem, color: "purple"} : elem))  
    }

    const selectCar = (id: number): void => {
        setIsSelected(id)
    }

    return (
        <div>{car?.map((item) => (
            <div key={item.id} className={`line-container ${isSelected === item.id ? 'selected' : ''}`}>
                <div className="line line-dir">
                    <div className="side-btn-container">
                        <Button title="Select" onClick={() => selectCar(item.id)} />
                        <Button title="Delete" onClick={() => changeColor(item.id)} />
                    </div>
                    <div className="side-btn-container race-btn">
                        <Button title="Start" onClick={() => selectCar(item.id)} />
                        <Button title="Stop" onClick={() => changeColor(item.id)} />
                    </div>
                    <div className="car">
                        <FaCarSide fontSize="2em" color={item.color}/>
                    </div>
                    <span className="car-name">{item.name}</span>
                </div>
            </div>
        ))}</div>
    )

} 

export default RacingLine