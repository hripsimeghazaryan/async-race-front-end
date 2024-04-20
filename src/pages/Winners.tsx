import { Col, Row, Typography } from "antd";
import { FaCarSide } from 'react-icons/fa6';
import Button from "../components/Button";
import PaginationComp from "../components/Pagination";
import './Winners.css';
import { useContext } from "react";
import { WinnersType } from "../interfaces/WinnersType";
import { WinnersDataContext } from "../contexts/winners-data";


function Winners() {
  const { winners, pagination, changePagination } = useContext(WinnersDataContext) as WinnersType;

  const handleNextPage = (page: number, limit: number) => {
    changePagination(page + 1, limit);
  };

  const handlePrevPage = (page: number, limit: number) => {
    changePagination(page - 1, limit);
  };

  return (
    <div className="page-container">
      <div className="winners-header">
        <Typography.Title className="page-title winners-title">Winners</Typography.Title>
      </div>
      <div className="winners-table">
        <Row className="table-header table-row">
          <Col span={4} order={1}>No</Col>
          <Col span={4} order={2}>Car</Col>
          <Col span={4} order={3}>Name</Col>
          <Col span={4} order={4}>Wins</Col>
          <Col span={4} order={5}>Best Time (Seconds)</Col>
        </Row>
        {
          winners?.map((winner) => (
            <Row key={winner.id} className="table-row">
              <Col span={4} order={1}>{winner.id}</Col>
              <Col span={4} order={2}>
                <FaCarSide size="1.2rem" color={winner.color} />
              </Col>
              <Col span={4} order={3}>{winner.name}</Col>
              <Col span={4} order={4}>{winner.wins}</Col>
              <Col span={4} order={5}>{winner.time}</Col>
            </Row>
          ))
        }
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
