import StaticPage from "../../common/staticPage/StaticPage";
import styles from "./Workload.module.css"
import global_styles from "../../../../styles/global.module.css"
import classNames from "classnames";
import BigTable from "../../../common/table/bigTable/BigTable";
import fakeData from "./MOCK_DATA.json"


const fakeColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "First name",
    accessor: "first_name",
  },
  {
    Header: "Last name",
    accessor: "last_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "University",
    accessor: "university",
  },
]

const Workload = () => {
  return (
    <StaticPage>
      <div styles={classNames(global_styles.white_rounded_box, styles.container)}>
        <BigTable columns={fakeColumns} data={fakeData} />
      </div>
    </StaticPage>
  );
}

export default Workload;