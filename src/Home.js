import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import * as dayjs from "dayjs";
import * as _ from "lodash";

export function Home() {
  const daysInCurrentMonth = dayjs().daysInMonth();
  const currentDay = dayjs().date();
  const currentMonth = dayjs().format("MMM, YYYY");

  const getStateFromLocalStorage = (month) => {
    return localStorage.getItem(month);
  };

  const setStateInLocalStorage = (month, data) => {
    localStorage.setItem(month, data);
  };

  const [habit1Name, setHabit1Name] = useState("");
  const [habit2Name, setHabit2Name] = useState("");
  const [habit3Name, setHabit3Name] = useState("");
  const [habit4Name, setHabit4Name] = useState("");

  const [dayList, setDayList] = useState(
    Array.from({ length: daysInCurrentMonth }, () => ({
      habit1: false,
      habit2: false,
      habit3: false,
      habit4: false,
    }))
  );

  useEffect(() => {
    if (getStateFromLocalStorage(currentMonth)) {
      setDayList(JSON.parse(getStateFromLocalStorage(currentMonth)));
    }

    if (currentMonth + "_habit_1") {
      setHabit1Name(localStorage.getItem(currentMonth + "_habit_1"));
    }

    if (currentMonth + "_habit_2") {
      setHabit2Name(localStorage.getItem(currentMonth + "_habit_2"));
    }

    if (currentMonth + "_habit_3") {
      setHabit3Name(localStorage.getItem(currentMonth + "_habit_3"));
    }

    if (currentMonth + "_habit_4") {
      setHabit4Name(localStorage.getItem(currentMonth + "_habit_4"));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const onHabitClick = useCallback(
    (dayIndex, habitIndex) => {
      const newDayList = _.cloneDeep(dayList);
      newDayList[dayIndex][`habit${habitIndex}`] =
        !newDayList[dayIndex][`habit${habitIndex}`];
      setDayList(newDayList);
      setStateInLocalStorage(currentMonth, JSON.stringify(newDayList));
    },
    [dayList]
  );

  const onInput = (e, setValue, i) => {
    setValue(e.currentTarget.value);
    localStorage.setItem(currentMonth + "_habit_" + i, e.currentTarget.value);
  };

  return (
    <div class="container">
      <h1 class="mt-5">{currentMonth}</h1>
      <div class="habit-group-list">
        {dayList.map((day, index) => (
          <div key={index} class="habit-group">
            <div
              onClick={() => onHabitClick(index, 1)}
              class={`habit habit-1 ${day.habit1 ? "active" : ""}`}
            >
              {day.habit1}
            </div>
            <div
              onClick={() => onHabitClick(index, 2)}
              class={`habit habit-2 ${day.habit2 ? "active" : ""}`}
            >
              {day.habit2}
            </div>
            <div
              onClick={() => onHabitClick(index, 3)}
              class={`habit habit-3 ${day.habit3 ? "active" : ""}`}
            >
              {day.habit3}
            </div>
            <div
              onClick={() => onHabitClick(index, 4)}
              class={`habit habit-4 ${day.habit4 ? "active" : ""}`}
            >
              {day.habit4}
            </div>
            <div
              class={`day-number ${currentDay === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      <div class="habit-form">
        <div>
          <input
            placeholder="Habit"
            value={habit1Name}
            onInput={(e) => onInput(e, setHabit1Name, 1)}
          />
        </div>
        <div>
          <input
            placeholder="Habit"
            value={habit2Name}
            onInput={(e) => onInput(e, setHabit2Name, 2)}
          />
        </div>
        <div>
          <input
            placeholder="Habit"
            value={habit3Name}
            onInput={(e) => onInput(e, setHabit3Name, 3)}
          />
        </div>
        <div>
          <input
            placeholder="Habit"
            value={habit4Name}
            onInput={(e) => onInput(e, setHabit4Name, 4)}
          />
        </div>
      </div>
    </div>
  );
}
