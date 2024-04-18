/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext } from 'react';
import RacingField from '../components/RacingField';
import Button from '../components/Button';
import CreateCar from '../interfaces/CreateCar';
import { GarageDataContext } from '../contexts/garage-data';
import requests from '../utils/requests';
import { GarageType } from '../interfaces/GarageType';
import './Garage.css';

function Garage() {
  const {
    createCar, updateCar, pagination, changePagination, generateCars,
  } = useContext(GarageDataContext) as GarageType;
  const [newName, setNewName] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('#ffffff');
  const [updateName, setUpdateName] = useState<string>('');
  const [updateColor, setUpdateColor] = useState<string>('#ffffff');
  const [toUpdate, setToUpdate] = useState<number | null>(null);

  const handleSubmit = async () => {
    const carData: CreateCar = {
      name: newName,
      color: newColor,
    };
    createCar(carData);
  };

  const getCar = async (id: number) => {
    const response = requests.getCar(id).then((data) => {
      setUpdateName(data.name);
      setUpdateColor(data.color);
    });
  };

  const handleUpdate = async (id: number) => {
    setToUpdate(id);
    getCar(id);
  };

  const handleUpdateCar = async () => {
    if (toUpdate !== null) {
      const carData: CreateCar = {
        name: updateName,
        color: updateColor,
      };
      updateCar(toUpdate, carData);
    }
  };

  const handleNextPage = (page: number, limit: number) => {
    changePagination(page + 1, limit);
  };

  const handlePrevPage = (page: number, limit: number) => {
    changePagination(page - 1, limit);
  };

  const handleGenerateCars = (count: number) => {
    generateCars(count);
  };

  return (
    <div className="page-container">
      <div className="garage-header">
        <h1 className="page-title garage-title">Garage</h1>
      </div>
      <div className="cars-modify-container">
        <Button title="Generate" onClick={() => handleGenerateCars(10)} className="modify-item" />
        <div className="create-car-container modify-item">
          <form onSubmit={handleSubmit} className="car-form create-form">
            <input type="text" value={newName} onChange={(event) => setNewName(event?.target.value)} />
            <input type="color" value={newColor} onChange={(event) => setNewColor(event?.target.value)} />
            <input type="submit" className="btn-style btn-hover" />
          </form>
        </div>
        <div className="update-car-container modify-item">
          <form onSubmit={handleUpdateCar} className="car-form update-form">
            <input type="text" value={updateName} onChange={(event) => setUpdateName(event?.target.value)} />
            <input type="color" value={updateColor} onChange={(event) => setUpdateColor(event?.target.value)} />
            <input type="submit" className="btn-style btn-hover" />
          </form>
        </div>
      </div>
      <div className="racing-track-container">
        <RacingField toUpdate={handleUpdate} />
        <div className="racing-track-pagination">
          <Button
            title="Prev"
            onClick={() => handlePrevPage(pagination.page, pagination.limit)}
            className={(pagination.page > 1) ? '' : 'btn-hidden'}
          />
          <p className="pagintation-txt">
            {pagination.page}
            /
            {pagination.total}
          </p>
          <Button
            title="Next"
            onClick={() => handleNextPage(pagination.page, pagination.limit)}
            className={(pagination.page < pagination.total) ? '' : 'btn-hidden'}
          />
        </div>
      </div>
    </div>
  );
}

export default Garage;
