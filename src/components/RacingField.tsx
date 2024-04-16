import { useState, useEffect, useContext } from "react";
import RacingLine from "./RacingLine";
import requests from "../utils/resuests";
import Car from "../interfaces/Car";
import { GarageDataContext } from "../contexts/garage-data";

type GarageType = {
    cars: Car[];
}

function RacingField () {
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const { cars } = useContext(GarageDataContext) as GarageType

    return (
        <div className="racing-field">{
            cars?.map((item) => 
            <RacingLine 
            id={item.id} 
            name={item.name} 
            color={item.color}
            />)
        }
        </div>
    )

}

export default RacingField;