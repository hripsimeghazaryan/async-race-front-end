import { useState, useContext } from "react";
import RacingField from "../components/RacingField";
import CreateCar from "../interfaces/CreateCar";
import { GarageDataContext } from "../contexts/garage-data";
import requests from "../utils/resuests";
import { GarageType } from "../interfaces/GarageType";
import './Garage.css';

function Garage() {
    const [newName, setNewName] = useState<string>("");
    const [newColor, setNewColor] = useState<string>("#ffffff");
    const [updateName, setUpdateName] = useState<string>("");
    const [updateColor, setUpdateColor] = useState<string>("");
    const [toUpdate, setToUpdate] = useState<number | null> (null);
    const { createCar, updateCar } = useContext(GarageDataContext) as GarageType;

    const handleSubmit = async () => {
        const carData: CreateCar = {
            name: newName,
            color: newColor
        }
        createCar(carData);
    }

    const getCar = async (id: number) => {
        const response = requests.getCar(id).then((data) => {
            setUpdateName(data.name)
            setUpdateColor(data.color)
        })
    }

    const handleUpdate = async (id: number) => {
        setToUpdate(id);
        getCar(id);
    }

    const handleUpdateCar = async () => {
        if (toUpdate !== null) {
            const carData: CreateCar = {
                name: updateName,
                color: updateColor
            }
            updateCar(toUpdate, carData);
        }
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
            <div className="update-car-container">
            <form onSubmit={handleUpdateCar} className="create-car-form">
                    <input type="text" value={updateName} onChange={(event) => setUpdateName(event?.target.value)}></input>
                    <input type="color" value={updateColor} onChange={(event) => setUpdateColor(event?.target.value)}></input>
                    <input type="submit"></input>
                </form>
            </div>
            <div className="racing-track-container">
                <RacingField toUpdate={handleUpdate}/>
            </div>
        </div>
    );

}

export default Garage;