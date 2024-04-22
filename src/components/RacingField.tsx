import { useContext, useState, useEffect } from 'react';
import RacingLine from './RacingLine';
import { GarageType } from '../interfaces/GarageType';
import { WinnersType } from '../interfaces/WinnersType';
import { GarageDataContext } from '../contexts/garage-data';
import { WinnersDataContext } from '../contexts/winners-data';
import requests from '../utils/requests';
import Winner from '../interfaces/Winner';

interface FinishedCar {
  id: number,
  time: number
  name: string
}

function RacingField(props: {toUpdate: (id: number) => void, startRace: boolean, stopRace: () => void, resetCars: () => void}) {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [finishedCar, setFinishedCar] = useState<FinishedCar | null>(null);
  const { cars } = useContext(GarageDataContext) as GarageType;
  const { createWinner, updateWinner } = useContext(WinnersDataContext) as WinnersType;

  const onSelect = (id: number) => {
    setIsSelected(isSelected === id ? null : id);
    props.toUpdate(id);
  };

  const handleFinishedCars = (id: number, time: number, name: string) => {
    setFinishedCar({ id: id, time: time, name: name});
  }

  useEffect(() => {
    if (finishedCar === null) {
      return;
    }

    const create = async () => {
      const check = await requests.getWinner(finishedCar.id).then((res) => {
        if (!res.id) {
          const newWinner: Winner = {
            id: finishedCar.id,
            wins: 1,
            time: finishedCar.time
          }
          createWinner(newWinner);
        } else {
          const updatedWinner: Winner = {
            id: res.id,
            time: Math.min(finishedCar.time, res.time),
            wins: res.wins + 1
          }
          updateWinner(updatedWinner);
        }
      })
    }
    create();
  }, [finishedCar]);

  return (
    <div className="racing-field">
      {
            cars?.map((item) => (
              <RacingLine
              key={item.id}
              car={item}
              select={isSelected === item.id}
              onSelect={onSelect}
              startRace={props.startRace}
              stopRace={props.stopRace}
              onFinish={handleFinishedCars}
            />
            ))
        }
    </div>
  );
}

export default RacingField;
