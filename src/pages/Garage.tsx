import { useState } from "react";
import RacingField from "../components/RacingField";
import requests from "../utils/resuests";
import Car from "../interfaces/Car";
import CreateCar from "../interfaces/CreateCar";
import './Garage.css'

function Garage() {
    const [newName, setNewName] = useState<string>("");
    const [newColor, setNewColor] = useState<string>("");

    const createCar = async () => {
        const carData: CreateCar = {
            name: newName,
            color: newColor
        }
        const response = await requests.createCar(carData);
    }

    return (
        <div className="garage-container">
            <div className="garage-header">
                <h1 className="page-title garage-title">Garage</h1>
            </div>
            <div className="create-car-container">
                <form onSubmit={createCar} className="create-car-form">
                    <input type="text" value={newName} onChange={(event) => setNewName(event?.target.value)}></input>
                    <input type="color" value={newColor} onChange={(event) => setNewColor(event?.target.value)}></input>
                    <input type="submit"></input>
                </form>
            </div>
            <div className="racing-track-container">
                <RacingField />
            </div>
        </div>
    );

}

export default Garage;