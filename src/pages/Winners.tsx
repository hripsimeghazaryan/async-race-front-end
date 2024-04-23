import { Col, Row } from "antd";
import Header from "../components/Header";
import PaginationComp from "../components/Pagination";
import { useContext, useState } from "react";
import { WinnersType } from "../interfaces/WinnersType";
import { WinnersDataContext } from "../contexts/winners-data";
import WinnerField from "../components/WinnerField";
import usePersistency from "../hooks/Persistency";
import './Winners.css';


function Winners() {
  const [idOrder, setIdOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [winsOrder, setWinsOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [timeOrder, setTimeOrder] = useState<'ASC' | 'DESC'>('DESC');
  const { pagination, changePagination, sortWinners } = useContext(WinnersDataContext) as WinnersType;

  const handleNextPage = (page: number, limit: number) => {
    changePagination(page + 1, limit);
  };

  const handlePrevPage = (page: number, limit: number) => {
    changePagination(page - 1, limit);
  };

  const handleIdOrder = () => {
    sortWinners('id', idOrder);
    setIdOrder(idOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleWinsOrder = () => {
    sortWinners('wins', idOrder);
    setIdOrder(idOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleTimeOrder = () => {
    sortWinners('time', idOrder);
    setIdOrder(idOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  return (
    <div className="page-container">
      <Header title={"Winner"} total={pagination.total} />
      <div className="winners-table">
        <Row className="table-header table-row">
          <Col className="column" span={4} order={1}>
            <div className="column-title" onClick={handleIdOrder}>№</div>
          </Col>
          <Col className="column" span={4} order={2}>Car</Col>
          <Col className="column" span={4} order={3}>Name</Col>
          <Col className="column" span={4} order={4}>
            <div className="column-header" onClick={handleWinsOrder}>Wins</div>
          </Col>
          <Col className="column" span={4} order={5}>
            <div className="column-header" onClick={handleTimeOrder}>Best Time</div>
          </Col>
        </Row>
        <WinnerField />
        <PaginationComp
        pagination={pagination}
        nextPage={() => handleNextPage(pagination.page, pagination.limit)}
        previousPage={() => handlePrevPage(pagination.page, pagination.limit)}
        />
      </div>
    </div>
  );
}

export default Winners;
