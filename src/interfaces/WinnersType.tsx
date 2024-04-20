import Winner from './Winner';
import WinnersData from './WinnersData';
import Pagination from './Pagination';

export type WinnersType = {
    winners: WinnersData[];
    createWinner: (winner: Winner) => void;
    deleteWinner: (id: number) => void;
    updateWinner: (winner: Winner) => void;
    pagination: Pagination;
    changePagination: (page: number, limit: number) => void;
}