import classNames from "classnames";
import global_styles from "../../../../styles/global.module.css";
import "react-big-calendar/lib/sass/styles.scss";
import "./Planner.css";
import styles from "./Planner.module.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ru";
import { useCallback, useMemo, useState } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import Globalize from "globalize";
import MyRange from "./myRange/MyRange";
import MyEventComponent from "./myEvent/MyEventComponent";
import MyEventWrapperComponent from "./myEventWrapper/MyEventWrapperComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../../../../store/globalSlice";

import toRuFormat from '../../../../hooks/Helper'

Globalize.culture("ru-RU");
moment.locale("ru");
const localizer = momentLocalizer(moment);
const cultures = ["en", "ru-RU"];
const lang = {
  en: null,
  "ru-RU": {
    week: "Неделя",
    work_week: "Рабочая неделя",
    day: "День",
    month: "Месяц",
    previous: "Предыдущая",
    next: "Следующая",
    today: "Сегодня",
    agenda: "Дневник",

    showMore: (total) => `+${total} больше`,
  },
};

// const testEvents = [
//   {
//     id: 0,
//     title: 'Информатика',
//     start: new Date(2024, 0, 21, 9, 30, 0),
//     end: new Date(2024, 0, 21, 11 , 45, 0),
//     teacher: "Востриков Александр Владимирович",
//     auditorium: 504,
//     type: "Лекционная",
//     courseNo: 1,
//     groupNo: "БИБ231"
//   },

//   {
//     id: 1,
//     title: 'Основы российской государственности',
//     start: new Date(2024, 0, 23, 11, 15, 0),
//     end: new Date(2024, 0, 23, 14 , 0, 0),
//     teacher: "Востриков Александр Владимирович",
//     auditorium: 506,
//     type: "Компъютерная",
//     courseNo: 2,
//     groupNo: "БИБ223"
//   },

//   {
//     id: 2,
//     title: 'Разработка защищенных приложений',
//     start: new Date(2024, 0, 24, 7, 0, 0),
//     end: new Date(2024, 0, 24, 9 , 45, 0),
//     teacher: "Востриков Александр Владимирович",
//     auditorium: 504,
//     type: "Лекционная",
//     courseNo: 1,
//     groupNo: "БИБ231"
//   },

//   {
//     id: 3,
//     title: 'Математический анализ',
//     start: new Date(2024, 0, 27, 8, 0, 0),
//     end: new Date(2024, 0, 27, 15 , 0, 0),
//     teacher: "Востриков Александр Владимирович",
//     auditorium: 308,
//     type: "Компъютерная",
//     courseNo: 2,
//     groupNo: "БИБ221"
//   },
// ]

const DnDCalendar = withDragAndDrop(Calendar);

const updateEvent = (allEvents, updatedEvent) => {
  const filtered = allEvents.filter((item) => item.id !== updatedEvent.id);

  return [...filtered, { ...updatedEvent }];
};

const Planner = () => {
  const testEvents = useSelector((state) => state.global.events);
  const dispatch = useDispatch();

  const [culture, setCulture] = useState("ru-RU");
  const [myEvents, setMyEvents] = useState(testEvents);

  const onEventDrop = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      if (!event.allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => updateEvent(prev, { ...event, start, end }));
      dispatch(setSelectedEvent({ ...event, start, end }));
    },
    [setMyEvents]
  );

  const onEventResize = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => updateEvent(prev, { ...event, start, end }));
      dispatch(setSelectedEvent({ ...event, start, end }));
    },
    [setMyEvents]
  );

  // const eventPropGetter = useCallback(
  //   (event, start, end, isSelected) => ({
  //     ...(isSelected && {
  //       style: {
  //         background: '#000',
  //       },
  //     }),
  //   }),
  //   []
  // )

  const {
    defaultDate,
    formats,
    messages,
    views,
    events,
    components,
    duration,
  } = useMemo(
    () => ({
      defaultDate: new Date(2024, 0, 21),
      formats: {
        // the day of the week header in the 'month' view
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd", culture),
        // the day header in the 'week' and 'day' (Time Grid) views
        dayFormat: (date, culture, localizer) =>
          toRuFormat(localizer.format(date, "D MMM ddd", culture)),
        // the time in the gutter in the Time Grid views
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "HH:mm", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "HH:mm", culture) +
          " - " +
          localizer.format(end, "HH:mm", culture),
      },
      messages: lang[culture],
      views: {
        week: MyRange,
      },
      events: myEvents,
      components: {
        event: MyEventComponent,
        eventWrapper: MyEventWrapperComponent,
      },
      duration: 5,
    }),
    [culture, myEvents]
  );

  const onSelectEvent = useCallback((calEvent) => {
    calEvent.start = calEvent.start.toISOString();
    calEvent.end = calEvent.end.toISOString();
    dispatch(setSelectedEvent(calEvent));
  }, []);

  return (
    <div
      className={classNames(
        global_styles.white_rounded_box,
        styles.planner_big,
        "planner"
      )}
    >
      <DnDCalendar
        localizer={localizer}
        events={events}
        defaultView={"week"}
        toolbar={false}
        defaultDate={defaultDate}
        formats={formats}
        culture="ru-RU"
        messages={messages}
        views={views}
        onSelectEvent={onSelectEvent}
        components={components} // кастомные компоненты
        draggableAccessor={() => true}
        // selectable
        popup
        resizable
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        // eventPropGetter={eventPropGetter}

        // step={30} timeslots={2} // Большие деления - 1 час, маленькие деления - 30 минут - оставляем
        // step={20} timeslots={3} // Большие деления - 1 час, маленькие деления - 20 минут - оставляем
        step={10}
        timeslots={3} // Большие деления - 30 минут, маленькие деления - 10 минут - оставляем
      />
    </div>
  );
};

export default Planner;
