import classNames from "classnames";
import styles from "./Table.module.css";
// import './Table.css';
import { useTable } from "react-table";
import { useMemo } from "react";
import Dropdown from "../../pages/schedule/tools/dropdown/Dropdown";
import global_styles from "../../../styles/global.module.css";

const Table = (props) => {
  const data = useMemo(() => props.data, []);
  const columns = useMemo(() => props.columns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div
      className={classNames(global_styles.white_rounded_box, styles.hidden_box)}
    >
      <div className={classNames(styles.container, "table_container")}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()} key={i}>
                    <div>{column.render("Header")}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => (
                    <td {...cell.getCellProps()} key={i}>
                      <div>{cell.render("Cell")}</div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
