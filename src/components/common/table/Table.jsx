import classNames from "classnames";
import styles from "./Table.module.css";
// import './Table.css';
import { useSortBy, useTable, useFilters } from "react-table";
import { useMemo } from "react";
import Dropdown from "../../pages/schedule/tools/dropdown/Dropdown";
import global_styles from "../../../styles/global.module.css";
import SortUp from "../../../assets/icons/sort-up";
import SortDown from "../../../assets/icons/sort-down";
import SortDefault from "../../../assets/icons/sort-default";
import DefaultColumnFilter from "./DefaultColumnFilter/DefaultColumnFilter";
import { useDispatch } from "react-redux";
import { toggleIsFiltered } from "../../../store/globalSlice";

const Table = (props) => {
  const data = useMemo(() => props.data, []);
  const dispatcher = useDispatch();

  if (!props.isSorted) {
    props.columns.map((column) => {
      column["disableSortBy"] = true;
    });
  }

  if (!props.isFiltered) {
    props.columns.map((column) => {
      column["disableFilters"] = true;
    });
  }

  const numberFormat = (date) => {
    const splitDate = date.split(".");
    return new Date(splitDate[2], splitDate[1], splitDate[0]).getTime();
  };

  const sortTypes = {
    date: (rowA, rowB, columnId) => {
      const [a, b] = [rowA.values[columnId], rowB.values[columnId]];

      return numberFormat(a) > numberFormat(b) ? 1 : -1;
    },
  };

  const columns = useMemo(() => props.columns, [props.columns]);

  const defaultColumn = {
    Filter: DefaultColumnFilter,
    filter: "text",
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, sortTypes, defaultColumn },
      useFilters,
      useSortBy
    );

  const getColumnWidthStyle = (i) => {
    return {
      width: `${headerGroups[0].headers[i].width}px`,
      minWidth: `${headerGroups[0].headers[i].width}px`,
      maxWidth: "none",
    };
  };

  return (
    <div
      className={classNames(
        global_styles.white_rounded_box,
        styles.hidden_box,
        props.className
      )}
    >
      <div className={classNames(styles.container, "table_container")}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps()}
                    key={i}
                    className={column.id}
                    style={!props.autoWidth ? getColumnWidthStyle(i) : {}}
                  >
                    <div style={!props.autoWidth ? getColumnWidthStyle(i) : {}}>
                      {column.render("Header")}
                      {column.canSort && (
                        <button
                          className={styles.sort_btn}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          onClick={(e) => {
                            console.log('.....');
                            column.getHeaderProps(column.getSortByToggleProps()).onClick(e);
                            dispatcher(toggleIsFiltered());
                          }}
                        >
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortUp />
                            ) : (
                              <SortDown />
                            )
                          ) : (
                            <SortDefault />
                          )}
                        </button>
                      )}
                      {column.canFilter ? (
                        <div>{column.render("Filter")}</div>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, j) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => (
                    <td
                      {...cell.getCellProps()}
                      key={i}
                      // className={`r_${j}_c_${columns[i].accessor}`}
                      style={!props.autoWidth ? getColumnWidthStyle(i) : {}}
                    >
                      <div
                        className={classNames({
                          [styles.center]: props.center,
                        })}
                        style={!props.autoWidth ? getColumnWidthStyle(i) : {}}
                      >
                        {cell.render("Cell")}
                      </div>
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
