import { useState, useContext } from "react";
import RacingField from "../components/RacingField";
import CreateCar from "../interfaces/CreateCar";
import { GarageDataContext } from "../contexts/garage-data";
import { GarageType } from "../interfaces/GarageType";
import './Garage.css';

function Garage() {
    const [newName, setNewName] = useState<string>("");
    const [newColor, setNewColor] = useState<string>("#ffffff");
    const { createCar } = useContext(GarageDataContext) as GarageType;

    const handleSubmit = async () => {
        const carData: CreateCar = {
            name: newName,
            color: newColor
        }
        createCar(carData);
    }

    return (
        <div className="garage-container">
            <div className="garage-header">
                <h1 className="page-title garage-title">Garage</h1>
            </div>
            <div className="create-car-container">
                <form onSubmit={handleSubmit} className="create-car-form">
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