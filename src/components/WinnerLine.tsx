import { FaCarSide } from 'react-icons/fa6';
import { Col, Row } from "antd";

type Props = {
    id: number,
    name: string,
    color: string,
    wins: number,
    time: number
}

function WinnerLine({ id, name, color, wins, time }: Props) {

  return (
            <Row key={id} className="table-row">
              <Col span={4} order={1}>{id}</Col>
              <Col span={4} order={2}>
                <FaCarSide size="1.2rem" color={color} />
              </Col>
              <Col span={4} order={3}>{name}</Col>
              <Col span={4} order={4}>{wins}</Col>
              <Col span={4} order={5}>{time}</Col>
            </Row>
  );
}


export default WinnerLine;