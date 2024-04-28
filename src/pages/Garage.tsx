import { useState, useContext, FormEvent } from 'react';
import RacingField from '../components/RacingField';
import Button from '../components/Button';
import Header from '../components/Header';
import CreateCar from '../interfaces/CreateCar';
import PaginationComp from '../components/Pagination';
import { GarageDataContext } from '../contexts/garage-data';
import requests from '../utils/requests';
import { GarageType } from '../interfaces/GarageType';
import usePersisteny from '../hooks/Persistency';
import './Garage.css';

function Garage() {
  const {
    createCar, updateCar, pagination, changePagination, generateCars, updatePosition,
  } = useContext(GarageDataContext) as GarageType;
  const [newName, setNewName] = usePersisteny<string>('new_name', '');
  const [newColor, setNewColor] = usePersisteny<string>('new_color', '#ffffff');
  const [updateName, setUpdateName] = usePersisteny<string>('update_name', '');
  const [updateColor, setUpdateColor] = usePersisteny<string>('update_color', '#ffffff');
  const [toUpdate, setToUpdate] = usePersisteny<number | null>('update_id', null);
  const [race, setRace] = useState<boolean>(false);

  const handleRace = () => {
    setRace(true);
  };

  const stopRace = () => {
    setRace(false);
  };

  const resetCars = () => {
    stopRace();
    updatePosition(0);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const carData: CreateCar = {
      name: newName,
      color: newColor,
    };
    createCar(carData);
    setNewName('');
    setNewColor('#ffffff');
  };

  const getCar = async (id: number) => {
    const response = requests.getCar(id).then((data) => {
      setUpdateName(data.name);
      setUpdateColor(data.color);
    });
  };

  const handleUpdate = async (id: number | null) => {
    setToUpdate(id);
    if (id) {
      getCar(id);
    } else {
      setUpdateName('');
      setUpdateColor('#ffffff');
    }
  };

  const handleUpdateCar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toUpdate !== null) {
      const carData: CreateCar = {
        name: updateName,
        color: updateColor,
      };
      updateCar(toUpdate, carData);
      setUpdateName('');
      setUpdateColor('#ffffff');
      setToUpdate(null);
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
      <Header title="Garage" total={pagination.total} />
      <div className="cars-modify-container">
        <Button title="Generate" onClick={() => handleGenerateCars(100)} className="modify-item" />
        <div className="create-car-container modify-item">
          <form onSubmit={(event) => handleSubmit(event)} className="car-form create-form">
            <input type="text" value={newName} onChange={(event) => setNewName(event?.target.value)} />
            <input type="color" value={newColor} onChange={(event) => setNewColor(event?.target.value)} />
            <input type="submit" className="btn-style btn-hover" />
          </form>
        </div>
        <div className="update-car-container modify-item">
          <form onSubmit={(event) => handleUpdateCar(event)} className="car-form update-form">
            <input type="text" value={updateName} onChange={(event) => setUpdateName(event?.target.value)} />
            <input type="color" value={updateColor} onChange={(event) => setUpdateColor(event?.target.value)} />
            <input type="submit" className="btn-style btn-hover" />
          </form>
        </div>
        <div className="car-racing-btns">
          <Button title="Start Race" onClick={handleRace} />
          <Button title="Reset" onClick={resetCars} />
        </div>
      </div>
      <div className="racing-track-container">
        <RacingField
          toUpdate={handleUpdate}
          startRace={race}
          stopRace={stopRace}
          resetCars={resetCars}
        />
        <PaginationComp
          pagination={pagination}
          nextPage={() => handleNextPage(pagination.page, pagination.limit)}
          previousPage={() => handlePrevPage(pagination.page, pagination.limit)}
        />
      </div>
    </div>
  );
}

export default Garage;
