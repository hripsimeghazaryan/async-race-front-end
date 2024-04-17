/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useContext } from 'react';
import { FaCarSide } from 'react-icons/fa6';
import Button from './Button';
import Car from '../interfaces/Car';
import { GarageType } from '../interfaces/GarageType';
import { GarageDataContext } from '../contexts/garage-data';
import './RacingLine.css';

type Props = {
    car: Car,
    select: boolean,
    onSelect: (id: number) => void
}

function RacingLine({ car, select, onSelect }: Props) {
  const { deleteCar } = useContext(GarageDataContext) as GarageType;

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
          <Button title="Start" onClick={() => console.log('start')} />
          <Button title="Stop" onClick={() => console.log('stop')} />
        </div>
        <div className="car">
          <FaCarSide fontSize="2em" color={car.color} />
        </div>
        <span className="car-name">{car.name}</span>
      </div>
    </div>
  );
}

export default RacingLine;
