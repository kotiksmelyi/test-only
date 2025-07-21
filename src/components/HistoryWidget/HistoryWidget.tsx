import { useState } from "react";
import { mock } from "../../lib/consts/mock";
import AppContext from "../../lib/context/app-context";
import { CategoryPicker } from "../CategoryPicker";
import { Header } from "../Header";
import "./HistoryWidget.scss";
import { Swiper } from "../Swiper";
import { CategoryArrowPicker } from "../CategoryArrowPicker";

const HistoryWidget = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  return (
    <AppContext.Provider
      value={{ events: mock, currentEvent: currentEvent, setCurrentEvent }}
    >
      <div className="history_widget">
        <Header />
        <CategoryPicker />
		<hr />
        <CategoryArrowPicker />
        <Swiper />
      </div>
    </AppContext.Provider>
  );
};

export default HistoryWidget;
