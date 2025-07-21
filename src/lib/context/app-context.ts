import { createContext } from "react";
import { IEvents } from "../types/types";

const AppContext = createContext<{events: IEvents[], currentEvent: number, setCurrentEvent: React.Dispatch<React.SetStateAction<number>>}| null>(null);

export default AppContext;