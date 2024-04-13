class Requests {
    url: string;

    constructor() {
        this.url = "http://127.0.0.1:3000";
    }

    getCars = async () => {
        const response = await fetch(`${this.url}/garage`, {method: "GET"});
        const data = await response.json()
        return data;
    }

    getCar = async (id: number) => {
        const response = await fetch(`${this.url}/garage/${id}`, {method: "GET"});
        const data = await response.json()
        return data;
    }

    createCar = async (name: string, color: string) => {
        const response = await fetch(`${this.url}/garage}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        return data;

    }

    deleteCar = async (id: number) => {
        const response = await fetch(`${this.url}/garage/${id}`, {method: "DELETE"})
        const data = await response.json()
        return data;
    }

    updateCar = async (id: number) => {
        const response = await fetch(`${this.url}/garage/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        return data;
    }

    getWinners = async () => {
        const response = await fetch(`${this.url}/winners`, {method: "GET"});
        const data = await response.json()
        return data;
    }

    getWinner = async (id: number) => {
        const response = await fetch(`${this.url}/winners/${id}`, {method: "GET"});
        const data = await response.json()
        return data;
    }

    createWinner = async (id: number, name: string, color: string) => {
        const response = await fetch(`${this.url}/winners}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        return data;

    }

    deleteWinner = async (id: number) => {
        const response = await fetch(`${this.url}/winners/${id}`, {method: "DELETE"})
        const data = await response.json()
        return data;
    }

    updateWinner = async (id: number) => {
        const response = await fetch(`${this.url}/winners/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json()
        return data;
    }
}

const requests = new Requests()
export default requests;