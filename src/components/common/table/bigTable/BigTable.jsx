import Table from "../Table";
import styles from "./BigTable.module.css"

const BigTable = (props) => {
  return (
    <Table columns={props.columns} data={props.data} />
  );
}

export default BigTable;