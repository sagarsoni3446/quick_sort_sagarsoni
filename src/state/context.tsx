import { createContext, useState, useEffect } from "react";
import filter from "../utils/filter";

export interface DisplayState {
  grouping: "status" | "user" | "priority";
  ordering: "priority" | "title";
}

const initialDisplayState: DisplayState = {
  grouping: "status",
  ordering: "priority",
};

export interface ContextProps {
  data: {
    tickets: {
      id: string;
      title: string;
      tag: string[];
      userId: string;
      status: string;
      priority: number;
    }[];
    users: {
      id: string;
      name: string;
      available: boolean;
    }[];
  } | null;
  readonly setData: (data: object) => void;
  dataToRender: object | null;
  setDataToRender: (data: object) => void;
  readonly displayState: DisplayState;
  readonly setDisplayState: (displayState: DisplayState) => void;
  readonly loadData: () => Promise<void>;
}

export const AppContext = createContext<ContextProps>({
  data: null,
  setData: () => null,
  dataToRender: null,
  setDataToRender: () => null,
  displayState: initialDisplayState,
  setDisplayState: () => null,
  loadData: async () => {},
});

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<object | null>(null);
  const [dataToRender, setDataToRender] = useState<object | null>(null);
  const [displayState, setDisplayState] =
    useState<DisplayState>(initialDisplayState);

  const loadData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      await response.json();
      console.log(response);

      if (response) {
        setData(response);
      }
    } catch {
      console.log("error");
    }
  };

  const value = {
    data,
    setData,
    dataToRender,
    setDataToRender,
    displayState,
    setDisplayState,
    loadData,
  };

  useEffect(() => {
    // loadData();

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("filter function debug");
    data && console.log(filter(data, displayState));
    setDataToRender(data && filter(data, displayState));
  }, [data, displayState]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
