import Car from '../interfaces/Car';
import CreateCar from '../interfaces/CreateCar';
import Engine from '../interfaces/Engine';
import Winner from '../interfaces/Winner';

class Requests {
  url: string;

  constructor() {
    this.url = 'http://127.0.0.1:3000';
  }

  getCars = async (page: number, limit: number) => {
    const response = await fetch(`${this.url}/garage?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    const data: Car[] = await response.json();
    const total = parseInt((response.headers.get('X-Total-Count')) || '0', 10);
    return { data, total };
  };

  getCar = async (id: number) => {
    const response = await fetch(`${this.url}/garage/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch car: ${response.statusText}`);
    }

    const data: Car = await response.json();
    return data;
  };

  createCar = async (carData: CreateCar) => {
    const response = await fetch(`${this.url}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data: Car = await response.json();
    return data;
  };

  deleteCar = async (id: number) => {
    const response = await fetch(`${this.url}/garage/${id}`, {
      method: 'DELETE',
    });

    return;
  };

  updateCar = async (id: number, carData: CreateCar) => {
    const response = await fetch(`${this.url}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update car: ${await response.text()}`);
    }

    const data: Car = await response.json();
    return data;
  };

  startStopEngine = async (id: number, status: 'started' | 'stopped') => {
    const response = await fetch(`${this.url}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    })

    const data: Engine = await response.json();
    return data;
  }

  driveEngine = async (id: number, status: string = 'drive') => {
    const response = await fetch(`${this.url}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    })

    if(response.status !== 200) {
      return { success: false };
    }

    const data: { success: boolean } = await response.json();
    return data;
  }

  getWinners = async (page: number, limit: number) => {
    const response = await fetch(`${this.url}/winners?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    });
    const data: Winner[] = await response.json();
    const total = parseInt((response.headers.get('X-Total-Count')) || '0', 10);
    return { data, total };
  };

  getWinner = async (id: number) => {
    const response = await fetch(`${this.url}/winners/${id}`, { method: 'GET' });
    const data: Winner = await response.json();
    return data;
  };

  createWinner = async (winner: Winner) => {
    const response = await fetch(`${this.url}/winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });

    const data: Winner = await response.json();
    return data;
  };

  deleteWinner = async (id: number) => {
    const response = await fetch(`${this.url}/winners/${id}`, { method: 'DELETE' });

    return;
  };

  updateWinner = async (winner: Winner) => {
    const winnerData = {
      wins: winner.wins,
      time: winner.time,
    }
    const response = await fetch(`${this.url}/winners/${winner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winnerData),
    });
    const data: Winner = await response.json();
    return data;
  };
}

const requests = new Requests();
export default requests;
