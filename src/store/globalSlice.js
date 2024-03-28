import { createSlice } from "@reduxjs/toolkit";
import Root from "../components/root/Root";
import Page404 from "../components/pages/404/404";
import Schedule from "../components/pages/schedule/Schedule";
import Polling from "../components/pages/polling/Polling";
import Workload from "../components/pages/guides/workload/Workload";

import HomeIcon from "../assets/icons/sidebar/home";
import NotificationsIcon from "../assets/icons/sidebar/notifications";
import ScheduleIcon from "../assets/icons/sidebar/schedule";
import PollingIcon from "../assets/icons/sidebar/polling";
import UsersIcon from "../assets/icons/sidebar/users";
import GuidesIcon from "../assets/icons/sidebar/guides";
import HelpIcon from "../assets/icons/sidebar/help";
import InstructionIcon from "../assets/icons/sidebar/instruction";
import { Outlet } from "react-router-dom";
import Home from "../components/pages/home/Home";
import Users from "../components/pages/users/Users";
import Guides from "../components/pages/guides/Guides";
import Auditorium from "../components/pages/guides/auditorium/Auditorium";
import Login from "../components/pages/login/Login";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    sidebarIsOpen: true,
    isFiltered: true,
    pageTitle: [
      {
        id: 0,
        title: "Главная",
        to: "/",
        icon: HomeIcon,
      },
    ],
    links: [
      {
        id: 0,
        title: "Главная",
        to: "/",
        icon: HomeIcon,
      },
      {
        id: 1,
        title: "Расписание сессии",
        to: "/schedule",
        icon: ScheduleIcon,
      },
      {
        id: 2,
        title: "Анкетирование",
        to: "/polling",
        icon: PollingIcon,
      },
      {
        id: 3,
        title: "Пользователи",
        to: "/users",
        icon: UsersIcon,
      },
      {
        id: 4,
        title: "Справочники",
        to: "/guides",
        icon: GuidesIcon,
      },
      {
        id: 5,
        title: "Помощь",
        to: "/help",
        icon: HelpIcon,
      },
      {
        id: 6,
        title: "Инструкция",
        to: "/instruction",
        icon: InstructionIcon,
      },
      {
        id: 7,
        title: "Авторизация",
        to: "/login",
      },
      {
        id: 8,
        title: "Нагрузки",
        to: "/guides/workload",
      },
      {
        id: 9,
        title: "Аудитории",
        to: "/guides/auditorium",
      },
    ],
    routes: [
      {
        path: "/",
        exact: true,
        Component: Root,
        errorElement: Root,
        children: [
          {
            path: "",
            Component: Home,
          },
          {
            path: "schedule",
            Component: Schedule,
          },
          {
            path: "polling",
            Component: Polling,
          },
          {
            path: "users",
            Component: Users,
          },
          {
            path: "/guides",
            Component: Outlet,
            children: [
              {
                path: "",
                Component: Guides,
              },
              {
                path: "workload",
                Component: Workload,
              },
              {
                path: "auditorium",
                Component: Auditorium,
              },
            ],
          },
          {
            path: "help",
            Component: Page404,
          },
          {
            path: "instruction",
            Component: Page404,
          },
          {
            path: "*",
            Component: Page404,
          },
          {
            path: "login",
            Component: Login,
          },
        ],
      },
    ],
    selectedEvent: {},
    events: [
      {
        id: 0,
        title: "Информатика",
        start: new Date(2024, 0, 21, 9, 30, 0),
        end: new Date(2024, 0, 21, 11, 45, 0),
        format: "Очный",
        teacher: "Востриков Александр Владимирович",
        auditorium: "504 (лек)",
        op: "Информационная безопасность",
        courseNo: 1,
        groupNo: "БИБ231",
        credits: 6,
        note: "-",
      },

      {
        id: 1,
        title: "Основы российской государственности",
        start: new Date(2024, 0, 23, 11, 15, 0),
        end: new Date(2024, 0, 23, 14, 0, 0),
        format: "Онлайн",
        teacher: "Иванов Евгений Игоревич",
        auditorium: "110 (комп)",
        op: "Информатика и вычислительная техника",
        courseNo: 2,
        groupNo: "БИВ223",
        credits: 2,
        note: "-",
      },

      {
        id: 2,
        title: "Разработка защищенных приложений",
        start: new Date(2024, 0, 24, 7, 0, 0),
        end: new Date(2024, 0, 24, 9, 45, 0),
        format: "Онлайн",
        teacher: "Морозов Эдуард Викторович",
        auditorium: "412 (лек)",
        op: "Прикладная математика",
        courseNo: 1,
        groupNo: "ПМ23X",
        credits: 4,
        note: "-",
      },

      {
        id: 3,
        title: "Криптографические методы зациты информации",
        start: new Date(2024, 0, 27, 8, 0, 0),
        end: new Date(2024, 0, 27, 15, 0, 0),
        format: "Очный",
        teacher: "Евсютин Олег Олегович",
        auditorium: "308 (комп)",
        op: "Информационная безопасность",
        courseNo: 2,
        groupNo: "БИБ223",
        credits: 8,
        note: "-",
      },
    ],
    selectedUserOption: "Преподаватель",
    userOptions: [
      "Преподаватель",
      "Учебный офис",
      "Менеджер департамента",
      "Администратор",
    ],
    selectedTeacherOption: "Иванов Иван Иванович",
    teacherOptions: [
      "Иванов Иван Иванович",
      "Евсютин Александр Олегович",
      "Романова Наталья Викторовна",
      "Морозов Илья Владимирович",
    ],
    removeAllFilters: false,
  },
  reducers: {
    setPageTitle(state, action) {
      state.pageTitle = [];
      state.pageTitle.push(
        state.links.find(
          (link) =>
            link.id ===
            state.links.find(
              (item) => item.to === "/" + action.payload.split("/")[1]
            )?.id
        )
      );
      if (action.payload.split("/").length > 2) {
        state.pageTitle.push(
          state.links.find(
            (link) =>
              link.id ===
              state.links.find((item) => item.to === action.payload)?.id
          )
        );
      }
    },
    toggleSidebar(state) {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    toggleIsFiltered(state) {
      state.isFiltered = !state.isFiltered;
    },
    setEvents(state, action) {
      state.events = action.payload;
    },
    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },
    setSelectedUserOption(state, action) {
      state.selectedUserOption = action.payload;
    },
    setSelectedTeacherOption(state, action) {
      state.selectedTeacherOption = action.payload;
    },
    toggleRemoveAllFilters(state) {
      state.removeAllFilters = !state.removeAllFilters;
    },
  },
});

export const {
  setPageTitle,
  toggleSidebar,
  toggleIsFiltered,
  setEvents,
  setSelectedEvent,
  setSelectedUserOption,
  setSelectedTeacherOption,
  toggleRemoveAllFilters,
} = globalSlice.actions;

export default globalSlice.reducer;
