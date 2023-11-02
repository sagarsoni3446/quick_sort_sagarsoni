import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

interface ColumnHeaderProps {
  icon: JSX.Element;
  name: string;
  count: number;
}

export default function ColumnHeader({
  icon,
  name,
  count = 0,
}: ColumnHeaderProps) {
  return (
    <ColumnHeaderWrapper>
      <div className="left">
        <div className="icon">{icon}</div>
        <Title>{name}</Title>
        <Count>{count}</Count>
      </div>
      <div className="right">
        <BiPlus color="#697077" size={18} />
        <BsThreeDots color="#697077" size={18} />
      </div>
    </ColumnHeaderWrapper>
  );
}

const ColumnHeaderWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #343a3f;
`;

const Count = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #697077;
`;
