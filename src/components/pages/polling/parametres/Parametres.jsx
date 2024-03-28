import Table from "../../../common/table/Table";
import styles from "./Parametres.module.css";
import RadioButtons from "../../../common/radiobuttons/RadioButtons";
import CellDropdown from "../cellDropdown/CellDropdown";
import Input from "../../../common/input/Input";

const Parametres = ({ groups }) => {
  const columns = [
    {
      Header: "ㅤ",
      accessor: "field",
    },
  ];

  groups.map((group, i) => {
    columns.push({
      Header: group,
      accessor: "column" + (i + 1).toString(),
    });
  });

  const makeData = () => {
    const row1 = { field: "Формат проведения экзамена" };
    const row2 = { field: "Показ работ" };
    const row3 = { field: "Контингент" };
    const row4 = { field: "Максимальное количество групп в день" };
    const row5 = { field: "Продолжительность экзамена" };
    const row6 = { field: "Тип аудитории" };
    const row7 = { field: "Комментарий" };

    for (let i = 1; i <= groups.length; i++) {
      row1["column" + i.toString()] = (
        <CellDropdown
          options={["Пиьменно", "Устно", "Экзамена нет", "Онлайн"]}
          tableNo={1}
          r={0}
          c={"column" + i.toString()}
          isScrollPage={true}
          center={true}
        />
      );
      row2["column" + i.toString()] = (
        <CellDropdown
          options={[
            "Сразу",
            "Через 1 день",
            "Через 2 дня",
            "Через 3 дня",
            "Через 4 дня",
            "Через 5 дней",
          ]}
          tableNo={1}
          r={1}
          c={"column" + i.toString()}
          isScrollPage={true}
          center={true}
        />
      );
      row3["column" + i.toString()] = (
        <RadioButtons options={["Поток", "Группа"]} col={i} />
      );
      row4["column" + i.toString()] = (
        <RadioButtons options={["1", "2", "3", "4"]} col={i} />
      );
      row5["column" + i.toString()] = (
        <CellDropdown
          options={["1 пара", "2 пары", "3 пары", "4 пары", "5 пар", "6 пар"]}
          tableNo={1}
          r={4}
          c={"column" + i.toString()}
          isScrollPage={true}
          center={true}
        />
      );
      row6["column" + i.toString()] = (
        <CellDropdown
          options={[
            "Лекционная",
            "Семинарская",
            "Компьютерный класс",
            "Учебная лаборатория",
            "Онлайн",
          ]}
          tableNo={1}
          r={5}
          c={"column" + i.toString()}
          isScrollPage={true}
          center={true}
        />
      );
      row7["column" + i.toString()] = <Input hint="Написать комментарий" />;
    }

    const data = [row1, row2, row3, row4, row5, row6, row7];

    return data;
  };

  return (
    <Table data={makeData()} columns={columns} center={true} autoWidth={true} />
  );
};

export default Parametres;
