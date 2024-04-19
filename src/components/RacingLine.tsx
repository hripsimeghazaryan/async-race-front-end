import { useState, useContext } from 'react';
import { FaCarSide } from 'react-icons/fa6';
import Button from './Button';
import Car from '../interfaces/Car';
import Engine from '../interfaces/Engine';
import { GarageType } from '../interfaces/GarageType';
import { GarageDataContext } from '../contexts/garage-data';
import animate from 'animejs';
import './RacingLine.css';

type Props = {
    car: Car,
    select: boolean,
    onSelect: (id: number) => void
}

function RacingLine({ car, select, onSelect }: Props) {
  const [engineStatus, setEngineStatus] = useState<'started' | 'stopped' | 'drive'>('stopped');
  const [carPosition, setCarPosition] = useState<number>(0);
  const { deleteCar } = useContext(GarageDataContext) as GarageType;

  const handleEngine = async (id: number, status: 'started' | 'stopped') => {
    setEngineStatus('started');
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const { velocity, distance } = await response.json();

    if(response.ok) {
      const duration = (distance / velocity) / 1000;
      setEngineStatus('drive');

      const newresponse = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
      });
      const car = document.getElementById(`${id}`);
      car?.style.setProperty('--velocity', `${duration}`);
      car?.style.setProperty('--car-position', `${carPosition}`);

      // animate({
      //   targets: car,
      //   translateX: [
      //     '0px',
      //     ''
      //   ],
      //   duration: duration,
      //   easing: 'easeInOutSine',
      //   loop: false,
      // });
    }
  }

  const handleDelete = (id: number): void => {
    deleteCar(id);
  };

  return (
    <div key={car.id} className={`line-container ${select ? 'selected' : ''}`}>
      <div className="line line-dir">
        <div className="side-btn-container">
          <Button title="Select" onClick={() => onSelect(car.id)} />
          <Button title="Delete" onClick={() => handleDelete(car.id)} />
        </div>
        <div className="side-btn-container race-btn">
          <Button title="Start" onClick={() => handleEngine(car.id, 'started')} />
          <Button title="Stop" onClick={() => handleEngine(car.id, 'stopped')} />
        </div>
        <div id={`${car.id}`} className={`car ${engineStatus === 'drive' ? 'car-animation' : ''}`} style={{ transform: `translateX(${carPosition}px)` }}>
          <FaCarSide fontSize="2em" color={car.color} />
        </div>
        <span className="car-name">{car.name}</span>
      </div>
    </div>
  );
}

export default RacingLine;
