import { useState, useContext, useRef } from 'react';
import { FaCarSide } from 'react-icons/fa6';
import Button from './Button';
import Car from '../interfaces/Car';
import requests from '../utils/requests';
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
  const engineStatus = useRef<'started' | 'stopped' | 'drive'>('stopped');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carPosition = useRef<number>(0);
  // const [carPosition, setCarPosition] = useState<number>(0);
  const { deleteCar } = useContext(GarageDataContext) as GarageType;

  const handleStartEngine = async () => {
    if(engineStatus.current === 'stopped') {
      engineStatus.current = 'started';
      const response = await requests.startStopEngine(car.id, 'started');
      const { distance, velocity } = response;
      const duration = (distance / velocity) / 1000;
      engineStatus.current = 'drive';
      const driveRes = await requests.driveEngine(car.id);
    }
  }

  const handleStopEngine = async () => {
    if(engineStatus.current === 'drive') {
      engineStatus.current = 'stopped';
      const response = await requests.startStopEngine(car.id, 'stopped');
    }
  }

  const handleEngine = async (status: 'started' | 'stopped') => {
    if(engineStatus.current === 'stopped') {
      engineStatus.current = 'started';
      const response = await requests.startStopEngine(car.id, status);
      const { distance, velocity } = response;
      engineStatus.current = 'drive';
      const driveResp = await requests.driveEngine(car.id);
      const duration = (distance / velocity) / 1000;
      const parentContainer = document.querySelector('.racing-road')?.clientWidth || 0;

      const updatePosition = (speed: number) => {
        if(carPosition.current < parentContainer) {
          carPosition.current += speed;
        } else {
          clearInterval(intervalRef.current!);
          engineStatus.current = 'stopped';
        }
      };
      setInterval(updatePosition, 100) as unknown as NodeJS.Timeout;
      console.log(carPosition.current)
    }
  }

  const handleDelete = (id: number): void => {
    deleteCar(id);
  };

  return (
    <div key={car.id} className={`line-container ${select ? 'selected' : ''}`}>
      <div className="line line-dir">
        <div className="side-btn-container">
          <Button
          title="Select"
          onClick={() => onSelect(car.id)}
          />
          <Button
          title="Delete"
          onClick={() => handleDelete(car.id)}
          />
        </div>
        <div className="side-btn-container race-btn">
          <Button
          title="Start"
          onClick={() => handleEngine('started')}
          />
          <Button
          title="Stop"
          onClick={() => handleEngine('stopped')}
          />
        </div>
        <div className="racing-road">
          <div
          id={`${car.id}`}
          className={`car ${engineStatus.current === 'drive' ? 'car-animation' : ''}`}
          style={{
            transform: `translateX(${carPosition.current}px)`,

          }}
          >
            <FaCarSide fontSize="2em" color={car.color} />
          </div>
          <span className="car-name">{car.name}</span>
        </div>
      </div>
    </div>
  );
}

export default RacingLine;
