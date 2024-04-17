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
    createCar, updateCar, pagination, changePagination,
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

  return (
    <div className="garage-container">
      <div className="garage-header">
        <h1 className="page-title garage-title">Garage</h1>
      </div>
      <div className="create-car-container">
        <form onSubmit={handleSubmit} className="create-car-form">
          <input type="text" value={newName} onChange={(event) => setNewName(event?.target.value)} />
          <input type="color" value={newColor} onChange={(event) => setNewColor(event?.target.value)} />
          <input type="submit" />
        </form>
      </div>
      <div className="update-car-container">
        <form onSubmit={handleUpdateCar} className="create-car-form">
          <input type="text" value={updateName} onChange={(event) => setUpdateName(event?.target.value)} />
          <input type="color" value={updateColor} onChange={(event) => setUpdateColor(event?.target.value)} />
          <input type="submit" />
        </form>
      </div>
      <div className="racing-track-container">
        <RacingField toUpdate={handleUpdate} />
        <div className="racing-track-pagination">
          {pagination.page > 1 && (
            <Button title="Prev" onClick={() => handlePrevPage(pagination.page, pagination.limit)} />
          )}
          <p className="pagintation-txt">
            {pagination.page}
            /
            {pagination.total}
          </p>
          {pagination.page < pagination.total && (
            <Button title="Next" onClick={() => handleNextPage(pagination.page, pagination.limit)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Garage;
