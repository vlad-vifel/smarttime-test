import StaticPage from "../../common/staticPage/StaticPage";
import styles from "./Workload.module.css";
import global_styles from "../../../../styles/global.module.css";
import data from "./MOCK_DATA2.json";
import classNames from "classnames";
import Table from "../../../common/table/Table";
import Topbar from "./topbar/Topbar";
import { useSelector } from "react-redux";
import { useRef } from "react";
import CellDropdown from "../../polling/cellDropdown/CellDropdown";

const columns = [
  {
    Header: "ID дисциплины",
    accessor: "id",
    width: "185",
    // disableSortBy: true,
    // disableFilters: true,
  },
  {
    Header: "Дисциплина",
    accessor: "discipline",
    width: "450",
    sortType: "string",
  },
  {
    Header: "Кафедра нагрузки",
    accessor: "workload_department",
    width: "420",
    sortType: "string",
  },
  {
    Header: "Преподаватель",
    accessor: "teacher",
    width: "320",
    sortType: "string",
  },
  {
    Header: "Кафедра преподавателя",
    accessor: "teacher_department",
    width: "420",
    sortType: "string",
  },
  {
    Header: "Должность",
    accessor: "position",
    width: "240",
    sortType: "string",
  },
  {
    Header: "Роль",
    accessor: "role",
    width: "310",
    disableSortBy: true,
    disableFilters: true,
    // sortType: "string",
  },
  {
    Header: "Предметная единица",
    accessor: "subject_unit",
    width: "240",
    sortType: "string",
  },
  {
    Header: "Курс",
    accessor: "course",
    width: "150",
    sortType: "string",
  },
  {
    Header: "Группа",
    accessor: "group",
    width: "150",
    sortType: "string",
  },
  {
    Header: "Модуль экзамена",
    accessor: "module",
    width: "210",
    sortType: "string",
  },
  {
    Header: "Образовательная программа",
    accessor: "educational_program",
    width: "450",
    sortType: "string",
  },
  {
    Header: "Количество студентов",
    accessor: "student_number",
    width: "250",
    sortType: "string",
  },
  {
    Header: "Формат проведения",
    accessor: "format",
    width: "230",
    sortType: "string",
  },
];

data.map((row, i) => {
  row["workload_department"] ? null : row["workload_department"] = "—"
  row["teacher_department"] ? null : row["teacher_department"] = "—"
  row["role"] ? null : row["role"] = "—"


  row["role"] = (
    <CellDropdown
      options={["Ответственный преподаватель", "—"]}
      defaultOption={row["role"]}
      tableNo={0}
      r={i}
      c={`role`}
    />
  );
});

const Workload = () => {
  const getColumns = () => {
    const resColumns = [];
    const hiddenColumns = useSelector((state) => state.workload.hiddenColumns);
    columns.map((column) => {
      if (!hiddenColumns.includes(column.accessor)) {
        resColumns.push(column);
      }
    });
    return resColumns;
  };

  return (
    <StaticPage>
      <div
        className={classNames(
          global_styles.white_rounded_box,
          styles.container
        )}
      >
        <Topbar />
        <div className={styles.divider} />
        <Table
          columns={getColumns()}
          data={data}
          isSorted={true}
          isFiltered={true}
          storage={useSelector((state) => state.workload)}
        />
      </div>
    </StaticPage>
  );
};

export default Workload;
