import { useState, useEffect } from "react";
import requests from "../utils/resuests";
import { FaCarSide } from "react-icons/fa6";
import './RacingLine.css';

interface Car {
    name: "string",
    color: "string",
    id: "number"
}

function RacingLine() {
    const [car, setCar] = useState<Car[]>();

    useEffect(() => {
        const get = async () => {
            const data = await requests.getCars();
            setCar(data)
        }
        get();
    }, []);

    return (
        <div>{car?.map((item) => (
            <div key={item.id} className="line-container">
                <div className="line line-dir">
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