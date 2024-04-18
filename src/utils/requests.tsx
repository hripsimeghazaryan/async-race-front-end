import Car from '../interfaces/Car';
import CreateCar from '../interfaces/CreateCar';

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

    const data = await response.json();
    const total = Math.ceil(parseInt((response.headers.get('X-Total-Count')) || '0', 10) / limit);
    return { data, total };
  };

  getCar = async (id: number) => {
    const response = await fetch(`${this.url}/garage/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch car: ${response.statusText}`);
    }

    const data = await response.json();
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

    const data = await response.json() as Car;
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

    const data = await response.json() as Car;
    return data;
  };

  getWinners = async () => {
    const response = await fetch(`${this.url}/winners`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  };

  getWinner = async (id: number) => {
    const response = await fetch(`${this.url}/winners/${id}`, { method: 'GET' });
    const data = await response.json();
    return data;
  };

  createWinner = async () => {
    const response = await fetch(`${this.url}/winners}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  };

  deleteWinner = async (id: number) => {
    const response = await fetch(`${this.url}/winners/${id}`, { method: 'DELETE' });
    const data = await response.json();
    return data;
  };

  updateWinner = async (id: number) => {
    const response = await fetch(`${this.url}/winners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  };
}

const requests = new Requests();
export default requests;
