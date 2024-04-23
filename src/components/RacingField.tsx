import { useContext, useState, useEffect } from 'react';
import RacingLine from './RacingLine';
import { GarageType } from '../interfaces/GarageType';
import { WinnersType } from '../interfaces/WinnersType';
import { GarageDataContext } from '../contexts/garage-data';
import { WinnersDataContext } from '../contexts/winners-data';
import requests from '../utils/requests';
import Winner from '../interfaces/Winner';
import { Modal } from 'antd';

interface FinishedCar {
  id: number,
  time: number
  name: string
}

interface FieldProps {
  toUpdate: (id: number) => void,
  startRace: boolean,
  stopRace: () => void,
  resetCars: () => void,
}

function RacingField({toUpdate, startRace, stopRace, resetCars }: FieldProps) {
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
  }

  const onSelect = (id: number) => {
    setIsSelected(isSelected === id ? null : id);
    toUpdate(id);
  };

  const handleFinishedCars = (id: number, time: number, name: string) => {
    if(!winnerDeclared) {
      setFinishedCar(prev => [...prev, { id: id, time: time, name: name}]);
    }
  }

  useEffect(() => {
    if (!startRace) {
      setWinnerDeclared(false);
      setFinishedCar([]);
    }
  }, [startRace]);

  useEffect(() => {
    if (finishedCar.length > 0 && !winnerDeclared) {
      setWinnerDeclared(true);
      const firstCar = finishedCar[0];
      const create = async () => {
        const check = await requests.getWinner(firstCar.id).then((res) => {
          if (!res.id) {
            const newWinner: Winner = {
              id: firstCar.id,
              wins: 1,
              time: firstCar.time
            }
            createWinner(newWinner);
          } else {
            const updatedWinner: Winner = {
              id: res.id,
              time: Math.min(firstCar.time, res.time),
              wins: res.wins + 1
            }
            updateWinner(updatedWinner);
          }
        })
      }
      showModal();
      create();
    }
  }, [finishedCar, winnerDeclared]);

  return (
    <div className="racing-field">
      {
            cars?.map((item) => (
              <RacingLine
              key={item.id}
              car={item}
              select={isSelected === item.id}
              onSelect={onSelect}
              startRace={startRace}
              stopRace={stopRace}
              onFinish={handleFinishedCars}
            />
            ))
        }
        {winnerDeclared && (
          <Modal title="Winner" open={open} onCancel={closeModal} footer={null}>
            The winner of this race is {finishedCar[0]?.name} with {finishedCar[0]?.time}
          </Modal>
        )}
    </div>
  );
}

export default RacingField;
