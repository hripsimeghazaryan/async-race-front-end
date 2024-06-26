import { useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
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

interface FieldProps {
  toUpdate: (id: number | null) => void,
  startRace: boolean,
  stopRace: () => void,
  resetCars: () => void,
}

function RacingField({
  toUpdate, startRace, stopRace, resetCars,
}: FieldProps) {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [finishedCar, setFinishedCar] = useState<FinishedCar[]>([]);
  const { cars } = useContext(GarageDataContext) as GarageType;
  const { createWinner, updateWinner } = useContext(WinnersDataContext) as WinnersType;
  const [open, setOpen] = useState(false);

  const [winnerDeclared, setWinnerDeclared] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onSelect = (id: number) => {
    setIsSelected(isSelected === id ? null : id);
    if (isSelected === id) {
      toUpdate(null);
    } else {
      toUpdate(id);
    }
  };

  const handleFinishedCars = (id: number, time: number, name: string) => {
    if (!winnerDeclared) {
      setFinishedCar((prev) => [...prev, { id, time, name }]);
    }
  };

  useEffect(() => {
    if (!startRace) {
      setWinnerDeclared(false);
      setFinishedCar([]);
    }
  }, [startRace]);

  useEffect(() => {
    if (finishedCar.length && !winnerDeclared) {
      setWinnerDeclared(true);
      const firstCar = finishedCar[0];
      const create = async () => {
        const check = await requests.getWinner(firstCar.id).then((res) => {
          if (!res.id) {
            const newWinner: Winner = {
              id: firstCar.id,
              wins: 1,
              time: firstCar.time,
            };
            createWinner(newWinner);
          } else {
            const updatedWinner: Winner = {
              id: res.id,
              time: Math.min(firstCar.time, res.time),
              wins: ++res.wins,
            };
            updateWinner(updatedWinner);
          }
        });
      };
      showModal();
      create();
    }
  }, [createWinner, finishedCar, updateWinner, winnerDeclared]);

  return (
    <div className="racing-field">
      {
            cars?.map((item) => (
              <RacingLine
                key={item.id}
                car={item}
                onSelect={onSelect}
                startRace={startRace}
                onFinish={handleFinishedCars}
              />
            ))
        }
      {winnerDeclared && (
      <Modal title="Winner" open={open} onCancel={closeModal} footer={null}>
        The winner of this race is
        {' '}
        {finishedCar[0]?.name}
        {' '}
        with
        {' '}
        {finishedCar[0]?.time}
      </Modal>
      )}
    </div>
  );
}

export default RacingField;
