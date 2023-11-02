import { useContext } from "react";
import styled from "styled-components";
import { TopBar } from "./components/Layout/Layout";
import { AppContext } from "./state/context";
import DisplayButton from "./components/Component/DisplayButton/DisplayButton";
import DisplayCard from "./components/Component/DisplayCard/DisplayCard";
import { useEffect, useRef, useState } from "react";
import { ColumnHeader } from "./components/Layout/Layout";
import Card from "./components/Component/Card/Card";

function App() {
  const { dataToRender } = useContext(AppContext);

  // Checks for opening and closing based on mouse clicks
  const [isOpen, setIsOpen] = useState(false);
  const displayCardRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      displayCardRef.current &&
      !displayCardRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <TopBar>
        <div ref={displayCardRef}>
          <DisplayButton onClick={() => setIsOpen(!isOpen)} />
          {isOpen && <DisplayCard />}
        </div>
      </TopBar>
      {/* {data && <Card data={TempCardData} />} */}
      <Main>
        {dataToRender?.map((category) => (
          <div className="column">
            <ColumnHeader
              icon={category.icon}
              name={category.name}
              count={category.tickets.length}
            />
            <div className="column-cards">
              {category.tickets.map((ticket) => (
                <Card data={ticket} />
              ))}
            </div>
          </div>
        ))}
      </Main>
    </>
  );
}

const Main = styled.div`
  box-sizing: border-box;
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  gap: 2rem;
  width: 100vw;
  overflow-x: scroll;
  min-height: calc(100vh - 74px);
  .column {
    width: 20vw;
    min-width: 20vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .column-cards {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default App;
