import { Col, Row, Typography } from "antd";
import { FaCarSide } from 'react-icons/fa6';
import './Winners.css';
import { useEffect, useState } from "react";
import requests from "../utils/requests";

interface WinnersData {
  id: number,
  name: string,
  color: string,
  time: number,
  wins: number,
};

function Winners() {
  const [winners, setWinners] = useState<WinnersData[]>([]);

  useEffect(() => {
    const getWinners = async () => {
      const response = await requests.getWinners();
      response?.forEach(async (winner) => {
        const car = await requests.getCar(winner.id);
        const data: WinnersData = {
          id: winner.id,
          name: car.name,
          color: car.color,
          time: winner.time,
          wins: winner.wins
        }
        setWinners((prev) => [...prev, data]);
      })
    }
    getWinners();
  }, [])

  return (
    <div className="page-container">
      <div className="winners-header">
        <Typography.Title className="page-title winners-title">Winners</Typography.Title>
      </div>
      <div className="winners-table">
        <Row className="table-header table-row">
          <Col span={6} order={1}>No</Col>
          <Col span={6} order={2}>Car</Col>
          <Col span={6} order={3}>Name</Col>
          <Col span={6} order={3}>Wins</Col>
          <Col span={6} order={4}>Best Time (Seconds)</Col>
        </Row>
        {
        winners?.map((winner) => (
          <Row key={winner.id} className="table-row">
            <Col span={6} order={1}>{winner.id}</Col>
            <Col span={6} order={2}>
              <FaCarSide size="1.2rem" color={winner.color} />
            </Col>
            <Col span={6} order={3}>{winner.name}</Col>
            <Col span={6} order={3}>{winner.wins}</Col>
            <Col span={6} order={4}>{winner.time}</Col>
          </Row>
        ))
        }
      </div>
    </div>
  );
}

export default Winners;
