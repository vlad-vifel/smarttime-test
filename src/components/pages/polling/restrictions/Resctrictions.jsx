import Table from "../../../common/table/Table";
import styles from "./Restrictions.module.css";

import * as dates from "date-arithmetic";
import { momentLocalizer } from "react-big-calendar";
import MomentLocalizer from "react-widgets-moment";
import moment from "moment";
import "moment/locale/ru";
import Checkbox from "../../../common/checkbox/Checkbox";

import toRuFormat from "../../../../hooks/Helper";

moment.locale("ru");
const localizer = momentLocalizer(moment);

// const localizer = new MomentLocalizer(moment);

const Restrictions = ({ start, duration }) => {
  const makeColumns = () => {
    const columns = [
      {
        Header: "ㅤ",
        accessor: "time",
      },
    ];

    const startDate = start;
    const endDate = dates.add(startDate, duration - 1, "day");

    let current = startDate;

    let i = 1;

    while (localizer.lte(current, endDate, "day")) {
      columns.push({
        Header: toRuFormat(localizer.format(current, "D MMM ddd", "ru-RU")),
        accessor: "data" + i.toString(),
      });

      current = localizer.add(current, 1, "day");
      i += 1;
    }

    return columns;
  };

  const makeData = () => {
    const data = [];
    const slots = [
      "ВЕСЬ ДЕНЬ",
      "1 пара",
      "2 пара",
      "3 пара",
      "4 пара",
      "5 пара",
      "6 пара",
      "7 пара",
    ];
    const blocked = [1, 8];

    slots.map((slotName) => {
      const row = { time: slotName };
      for (let i = 1; i <= duration; i++) {
        if (blocked.includes(i)) {
          row["data" + i.toString()] = (
            <Checkbox checked={true} disabled={true} isClose={true}/>
          );
        } else {
          row["data" + i.toString()] = (
            <Checkbox checked={false} disabled={false} isClose={true}/>
          );
        }
      }
      data.push(row);
    });

    return data;
  };

  return (
    <Table data={makeData()} columns={makeColumns()} center={true} autoWidth={true}/>
  );
};

export default Restrictions;
