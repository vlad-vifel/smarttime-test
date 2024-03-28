import styles from "./Topbar.module.css";
import global_styles from "../../../../../styles/global.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { toggleRemoveAllFilters } from "../../../../../store/globalSlice";
import Download from "../../../../../assets/icons/download";
import DownloadTable from "../../../../common/downloadTable/DownloadTable";

const Topbar = () => {
  const dispatcher = useDispatch();
  const removeAllFilters = () => {
    dispatcher(toggleRemoveAllFilters());
  };

  return (
    <div className={styles.main}>
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
  );
};

export default Topbar;
