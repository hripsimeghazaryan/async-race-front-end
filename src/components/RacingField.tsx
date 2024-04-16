import { useState, useEffect } from "react";
import RacingLine from "./RacingLine";
import requests from "../utils/resuests";
import Car from "../interfaces/Car";

function RacingField () {
    const [cars, setCars] = useState<Car[]>();
    const [isSelected, setIsSelected] = useState<number | null>(null);

    useEffect(() => {
        const getCars = async () => {
            const data = await requests.getCars();
            setCars(data)
        }
        getCars();
    }, []);

    return (
        <div className="racing-field">{
            cars?.map((item) => 
            <RacingLine 
            id={item.id} 
            name={item.name} 
            color={item.color}
            
            />)
        }</div>
    )

}

export default RacingField;