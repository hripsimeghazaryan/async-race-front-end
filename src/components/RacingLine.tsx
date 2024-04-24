import {
  useState, useContext, useRef, useEffect,
} from 'react';
import { FaCarSide } from 'react-icons/fa6';
import Button from './Button';
import requests from '../utils/requests';
import { GarageType } from '../interfaces/GarageType';
import { GarageDataContext } from '../contexts/garage-data';
import Car from '../interfaces/Car';
import './RacingLine.css';

type Props = {
  car: Car,
  onSelect: (id: number) => void,
  startRace: boolean,
  onFinish: (id: number, time: number, name: string) => void
};

function RacingLine({
  car, onSelect, startRace, onFinish,
}: Props) {
  const carRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const durationRef = useRef<number>(0);
  const [engineStatus, setEngineStatus] = useState<'started' | 'stopped' | 'drive'>('stopped');
  const { deleteCar } = useContext(GarageDataContext) as GarageType;

  const distance = (carRef.current?.parentElement?.offsetWidth) || 0;

  useEffect(() => () => cancelAnimationFrame(animationRef.current!), []);

  useEffect(() => {
    if (!startRace) {
      handleStopEngine();
    }

    if (startRace && engineStatus !== 'started') {
      handleStartEngine();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      handleStopEngine();
    };
  }, [startRace]);

  const animate = (duration: number) => {
    const start = performance.now();
    const initialPosition = 0;
    const finishLine = distance - 50;

    const frame = (now: number) => {
      const elapsedTime = now - start;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentPosition = initialPosition + (finishLine - initialPosition) * progress;

      if (carRef.current) {
        carRef.current.style.left = `${currentPosition}px`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(frame);
      } else {
        onFinish(car.id, +(durationRef.current / 1000).toFixed(2), car.name);
        handleStopEngine();
      }
    };

    animationRef.current = requestAnimationFrame(frame);
  };

  const handleStartEngine = async () => {
    setEngineStatus('started');
    const response = await requests.startStopEngine(car.id, 'started').then((res) => {
      const durationMin = (res.distance / res.velocity);
      durationRef.current = durationMin;
    });
    setEngineStatus('drive');
    animate(durationRef.current);
    const drive = await requests.driveEngine(car.id).then((res) => {
      if (!res.success) {
        handleStopEngine();
      }
    });
  };

  const handleStopEngine = async () => {
    if (!startRace) {
      setEngineStatus('stopped');
      const response = await requests.startStopEngine(car.id, 'stopped');
    }
    if (animationRef.current) {
      setEngineStatus('stopped');
      cancelAnimationFrame(animationRef.current!);
      animationRef.current = null;
      const response = await requests.startStopEngine(car.id, 'stopped');
    }
  };

  const handleDelete = (id: number): void => {
    deleteCar(id);
  };

  return (
    <div key={car.id} className="line-container">
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
            className="car"
            style={{ left: 0 }}
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
