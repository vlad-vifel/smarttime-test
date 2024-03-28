import StaticPage from "../../common/staticPage/StaticPage";
import "./Auditorium.module.css";
import styles from "./Auditorium.module.css";
import global_styles from "../../../../styles/global.module.css";
import data from "./MOCK_DATA2.json";
import classNames from "classnames";
import Table from "../../../common/table/Table";
import Topbar from "./topbar/Topbar";
import { useSelector } from "react-redux";
import { useRef } from "react";

const columns = [
  {
    Header: "Номер",
    accessor: "nr",
    sortType: "number",
    // disableSortBy: true,
    // disableFilters: true,
  },
  {
    Header: "Тип аудитории",
    accessor: "type",
    sortType: "string",
  },
  {
    Header: "Вместимость",
    accessor: "capacity",
    sortType: "number",
  },
  {
    Header: "Принадлежность",
    accessor: "belonging",
    sortType: "string",
  },
  {
    Header: "Комментарий",
    accessor: "comment",
    sortType: "string",
    disableFilters: true,
  },
];

data.map((row) => {
  row["comment"] ? null: row["comment"] = "ㅤ";
});

const Auditorium = () => {
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
          styles.container,
          styles.auditorium
        )}
      >
        <Topbar />
        <div className={styles.divider} />
        <Table
          columns={getColumns()}
          data={data}
          isSorted={true}
          isFiltered={true}
          autoWidth={true}
        />
      </div>
    </StaticPage>
  );
};

export default Auditorium;
