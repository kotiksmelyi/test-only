import { useContext } from "react";
import Arrow from "../../assets/arrow.svg";
import AppContext from "../../lib/context/app-context";
import "./CategoryArrowPicker.scss";

const CategoryArrowPicker = () => {
  const { events, currentEvent, setCurrentEvent } = useContext(AppContext);
  return (
    <div className="arrow_picker_container">
      <div>0{currentEvent + 1}/0{events.length}</div>
      <div className="arrow_picker">
        <Arrow
          className={
            "arrow_picker__left" +
            (currentEvent === 0 ? " disabled" : "")
          }
          onClick={() =>
            currentEvent !== 0 && setCurrentEvent(currentEvent - 1)
          }
        />
        <Arrow
          className={
            "arrow_picker__right" +
            (currentEvent === events.length - 1 ? " disabled" : "")
          }
          style={{
            cursor: currentEvent === events.length - 1 ? "default" : "pointer",
          }}
          onClick={() =>
            currentEvent !== events.length - 1 &&
            setCurrentEvent(currentEvent + 1)
          }
        />
      </div>
    </div>
  );
};

export default CategoryArrowPicker;
