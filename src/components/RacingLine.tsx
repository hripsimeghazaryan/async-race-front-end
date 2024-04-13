import { useState, useEffect } from "react";
import requests from "../utils/resuests";

interface Car {
    name: "string",
    color: "string",
    id: "number"
}

function RacingLine() {
    const [car, setCar] = useState<Car[]>();

    useEffect(() => {
        const get = async () => {
            // const response = await fetch("http://127.0.0.1:3000/garage/1");
            // const res = await response.json()
            // console.log(res)
            // setCar(res);
            const data = await requests.getCars();
            setCar(data)
        }
        get();
    }, []);

    return (
        <div>{car?.map((item) => <div key={item.id}>{item.name}</div>)}</div>
    )

} 

export default RacingLine