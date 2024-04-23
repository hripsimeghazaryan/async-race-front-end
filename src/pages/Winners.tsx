import { Col, Row } from "antd";
import { FaCarSide } from 'react-icons/fa6';
import Header from "../components/Header";
import PaginationComp from "../components/Pagination";
import { useContext } from "react";
import { WinnersType } from "../interfaces/WinnersType";
import { WinnersDataContext } from "../contexts/winners-data";
import WinnerField from "../components/WinnerField";
import './Winners.css';


function Winners() {
  const { pagination, changePagination } = useContext(WinnersDataContext) as WinnersType;

  const handleNextPage = (page: number, limit: number) => {
    changePagination(page + 1, limit);
  };

  const handlePrevPage = (page: number, limit: number) => {
    changePagination(page - 1, limit);
  };

  return (
    <div className="page-container">
      <Header title={"Winner"} total={pagination.total} />
      <div className="winners-table">
        <Row className="table-header table-row">
          <Col span={4} order={1}>No</Col>
          <Col span={4} order={2}>Car</Col>
          <Col span={4} order={3}>Name</Col>
          <Col span={4} order={4}>Wins</Col>
          <Col span={4} order={5}>Best Time (Seconds)</Col>
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
