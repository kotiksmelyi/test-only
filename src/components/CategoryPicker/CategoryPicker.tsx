import { useContext, useRef, useState } from "react";
import AppContext from "../../lib/context/app-context";
import "./CategoryPicker.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { IEvent } from "../../lib/types/types";

gsap.registerPlugin(MotionPathPlugin);
const describeCirclePath = (cx: number, cy: number, r: number) =>
  `M ${cx + r}, ${cy} A ${r},${r} 0 1,1 ${cx - r},${cy} A ${r},${r} 0 1,1 ${
    cx + r
  },${cy}`;

const findYear = (events: IEvent[], ev: "max" | "min") => {
  if (!events || events.length === 0) {
    return undefined;
  }
  if (ev === "max") {
    return events.reduce((max, obj) => {
      return obj["year"] > max ? obj["year"] : max;
    }, events[0]["year"]);
  } else
    return events.reduce((min, obj) => {
      return obj["year"] < min ? obj["year"] : min;
    }, events[0]["year"]);
};

const CategoryPicker = () => {
  const { events, currentEvent, setCurrentEvent } = useContext(AppContext);
  const circlePath = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement[]>([]);
  const startYearRef = useRef<HTMLHeadingElement>(null);
  const endYearRef = useRef<HTMLHeadingElement>(null);
  const radius = 400;
  const center = radius / 2;
  const prevEventRef = useRef(currentEvent);

  useGSAP(
    () => {
      gsap.from(startYearRef.current, {
        innerText: findYear(events[prevEventRef.current].events, "min"),
        snap: {
          innerText: 1,
        },
      });
      gsap.from(endYearRef.current, {
        innerText: findYear(events[prevEventRef.current].events, "max"),
        snap: {
          innerText: 1,
        },
      });
      if (!circlePath.current) {
        return;
      }
      const total = events.length;
      const step = 1 / total;
      const activeStart = ((360 / total) * (events.length - 1)) / 360;
      const offsetOld =
        (activeStart - prevEventRef.current / total + total) % 1;
      const offsetNew = (activeStart - currentEvent / total + total) % 1;
      let rawDiff = (offsetNew - offsetOld + total) % 1;
      if (rawDiff > 0.5) rawDiff -= 1;
      if (rawDiff < -0.5) rawDiff += 1;
      dotsRef.current.forEach((dot, i) => {
        const base = i * step;

        const start = (base + offsetOld) % 1;
        let end = start + rawDiff;
        gsap.to(dot, {
          duration: 1,
          motionPath: {
            path: circlePath.current!,
            align: circlePath.current!,
            alignOrigin: [0.5, 0.5],
            start,
            end,
          },
          ease: "power2.out",
        });
      });
      prevEventRef.current = currentEvent;
    },
    { dependencies: [currentEvent] }
  );

  return (
    <div className="category_picker">
      <div className="category_picker__years" tabIndex={-1}>
        <h4 ref={startYearRef} className="category_picker__years--start">
          {findYear(events[currentEvent].events, "min")}
        </h4>
        <h4 ref={endYearRef} className="category_picker__years--end">
          {findYear(events[currentEvent].events, "max")}
        </h4>
      </div>
      <svg width={radius + 100} height={radius + 50}>
        <path
          d={describeCirclePath((radius + 100) / 2, (radius + 50) / 2, center)}
          fill="none"
          className="category_picker__circle"
          ref={circlePath}
        />
        {events.map((item, index) => {
          return (
            <g
              onClick={() => setCurrentEvent(index)}
              className={
                "category_picker__item_wrapper" +
                (index === currentEvent
                  ? " category_picker__item_wrapper--active"
                  : "")
              }
              ref={(el) => {
                el && (dotsRef.current[index] = el);
              }}
            >
              <circle
                color="currentColor"
                stroke="currentColor"
                className={
                  "category_picker__item" +
                  (index === currentEvent
                    ? " category_picker__item--active"
                    : "")
                }
              />
              <text
                y={4}
                fontSize="14"
                textAnchor="middle"
                className="category_picker__item__number"
              >
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CategoryPicker;
