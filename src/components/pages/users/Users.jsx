import StaticPage from "../common/staticPage/StaticPage";
import styles from "./Users.module.css";
import global_styles from "../../../styles/global.module.css";
import "./Users.css"
import data from "./MOCK_DATA2.json";
import classNames from "classnames";
import Table from "../../common/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { toggleRemoveAllFilters } from "../../../store/globalSlice";
import Download from "../../../assets/icons/download";
import DownloadTable from "../../common/downloadTable/DownloadTable";
import UserCellDropdown from "./userCellDropdown/UserCellDropdown";

const columns = [
  {
    Header: "Фамилия Имя Отчество",
    accessor: "fio",
    width: "380",
    sortType: "string",
    // disableSortBy: true,
    // disableFilters: true,
  },
  {
    Header: "Рабочий email",
    accessor: "email",
    width: "240",
    sortType: "string",
  },
  {
    Header: "Данные о пользователе",
    accessor: "info",
    width: "550",
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: "Роль",
    accessor: "role",
    width: "330",
    disableSortBy: true,
    disableFilters: true,
    // sortType: "string",
  },
  {
    Header: "Дата авторизации",
    accessor: "authorization_date",
    width: "220",
    sortType: "date",
  },
  {
    Header: "Состояние",
    accessor: "state",
    width: "220",
    sortType: "date",
  },
  {
    Header: "Авторизация",
    accessor: "authorization",
    width: "auto",
    disableSortBy: true,
    disableFilters: true,
    // sortType: "string",
  },
];

const generateToken = (e) => {
  console.log(e.target.title);
}

data.map((row, i) => {
  row["role"] = (
    <UserCellDropdown
      options={["Преподаватель", "Сотрудник", "Учебный офис", "Менеджер департамента", "Администратор"]}
      defaultOptions={row["role"]}
      tableNo={0}
      r={i}  
      c={"role"}
    />
  );
  
  row["authorization"] = (
    <button 
      className={global_styles.btn_orange}
      onClick={((e) => generateToken(e))}
      title={row["id"]}
    >
      Сгенерировать токен
    </button>
  );

});

const Users = () => {
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

  const dispatcher = useDispatch();
  const removeAllFilters = () => {
    dispatcher(toggleRemoveAllFilters());
  };

  return (
    <StaticPage>
      <div
        className={classNames(
          global_styles.white_rounded_box,
          styles.container
        )}
      >

        <div className={styles.top}>
          <div className={styles.left_side}>
            <button
              className={classNames(global_styles.btn_orange)}
              onClick={removeAllFilters}
            >
              Сбросить фильтры
            </button>
          </div>

          <div className={styles.right_side}>
            <DownloadTable />
          </div>
        </div>

        <div className={styles.divider} />

        <Table
          columns={getColumns()}
          data={data}
          isSorted={true}
          isFiltered={true}
          className={"user_table"}
        />
      </div>
    </StaticPage>
  );
};

export default Users;
