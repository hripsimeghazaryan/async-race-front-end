import { useState, useContext, useRef, useEffect } from 'react';
import { FaCarSide } from 'react-icons/fa6';
import Button from './Button';
import requests from '../utils/requests';
import { GarageType } from '../interfaces/GarageType';
import { GarageDataContext } from '../contexts/garage-data';
import CarRace from '../interfaces/CarRace';
import './RacingLine.css';

type Props = {
    car: CarRace,
    select: boolean,
    onSelect: (id: number) => void,
}

function RacingLine({ car, select, onSelect }: Props) {
  const carRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const durationRef = useRef<number>(0);
  const [engineStatus, setEngineStatus] = useState<'started' | 'stopped' | 'drive'>('stopped');
  const { deleteCar } = useContext(GarageDataContext) as GarageType;

  const distance = (carRef.current?.parentElement?.offsetWidth) || 0;

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  const animate = () => {
    if (carRef.current) {
      const distanceLeft = distance - car.position - 50;
      const increment = Math.min(Math.abs(distanceLeft), durationRef.current);

      car.position += increment;

      carRef.current.style.left = `${car.position}px`;

      if (car.position >= distance) {
        cancelAnimationFrame(animationRef.current!);
        setEngineStatus('stopped');
        animationRef.current = null;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleStartEngine = async () => {
    const response = await requests.startStopEngine(car.id, 'started').then((res) => {
      const durationMin = (res.distance / res.velocity) / 1000;
      durationRef.current = durationMin;
    });
    setEngineStatus('started')
    animate();

    const drive = await requests.driveEngine(car.id).then((res) => {
      if(!res.success) {
        handleStopEngine();
      }
    })
  };

  const handleStopEngine = async () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current!);
      const response = await requests.startStopEngine(car.id, 'stopped');
      setEngineStatus('stopped');
      animationRef.current = null;
    };
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
          onClick={() => handleStartEngine()}
          disabled={engineStatus !== 'stopped'}
          />
          <Button
          title="Stop"
          onClick={() => handleStopEngine()}
          disabled={engineStatus === 'stopped'}
          />
        </div>
        <div className="racing-road">
          <div
          ref={carRef}
          id={`${car.id}`}
          className={`car`}
          style={{ left: `${car.position}px` }}
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
