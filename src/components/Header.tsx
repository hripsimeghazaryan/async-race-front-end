import { Typography } from 'antd';
import './Header.css';

interface HeaderProps {
    title: string,
    total: number
}

function Header({title, total}: HeaderProps) {
    return (
        <div className="page-header">
            <Typography.Title className="page-title">Winners</Typography.Title>
            <Typography.Text className="page-subtitle">total: {total}</Typography.Text>
      </div>
    )
}

export default Header;