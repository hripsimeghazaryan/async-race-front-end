import {
    ReactNode, createContext, useState, useEffect,
} from 'react';
import requests from '../utils/requests';
import Car from '../interfaces/Car';
import Winner from '../interfaces/Winner';
import { WinnersType } from '../interfaces/WinnersType';
import WinnersData from '../interfaces/WinnersData';
import Pagination from '../interfaces/Pagination';

export const WinnersDataContext = createContext<WinnersType | null>(null);

export function WinnerProvider({ children }: { children: ReactNode}) {
    const [winners, setWinners] = useState<WinnersData[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
      page: 1,
      limit: 10,
      total: 0,
    });

    useEffect(() => {
      getWinners();
    }, []);

    const getWinners = async () => {
      const response = await requests.getWinners(pagination.page, pagination.limit);
      const { data, total } = response;
      const newData: WinnersData[] = [];
      data.forEach(async (winner, index) => {
          const newWinner = await toWinnersData(winner);
          newData[index] = newWinner;
      })
      setWinners(newData);
      setPagination({ ...pagination, total });
    };

    const toWinnersData = async (winner: Winner) => {
        const car: Car = await requests.getCar(winner.id);
        const newWinner: WinnersData = {
            id: winner.id,
            name: car.name,
            color: car.color,
            time: winner.time,
            wins: winner.wins
        }
        return newWinner;
    }

    const createWinner = async (winner: Winner) => {
      const response = await requests.createWinner(winner);
      const newWinners = await requests.getWinners(pagination.page, pagination.limit);
      const { data, total } = newWinners;
      data.forEach(async (winner) => {
        const newWinner = await toWinnersData(winner);
        setWinners([...winners, newWinner])
    })
    setPagination({ ...pagination, total });
    };

    const deleteWinner = async (id: number) => {
      const response = await requests.deleteWinner(id);
      const newData = await requests.getWinners(pagination.page, pagination.limit);
      const { data, total } = newData;
      data.forEach(async (winner) => {
        const newWinner = await toWinnersData(winner);
        setWinners([...winners, newWinner])
      })
      setPagination({ ...pagination, total });
    };

    const updateWinner = async (winner: Winner) => {
      const response = await requests.updateWinner(winner);
      const newData = await requests.getWinners(pagination.page, pagination.limit);
      const { data, total } = newData;
      data.forEach(async (winner) => {
        const newWinner = await toWinnersData(winner);
        setWinners([...winners, newWinner])
      })
      setPagination({ ...pagination, total });
    };

    const changePagination = async (page: number, limit: number) => {
      const response = await requests.getWinners(page, limit);
      const { data, total } = response;
      data.forEach(async (winner) => {
        const newWinner = await toWinnersData(winner);
        setWinners([...winners, newWinner])
      })
      setPagination({ ...pagination, total });
    };

    return (
      <WinnersDataContext.Provider value={{
        winners, createWinner, deleteWinner, updateWinner, pagination, changePagination,
      }}
      >
        {children}
      </WinnersDataContext.Provider>
    );
}
