import styles from "./Card.module.css";
import global_styles from "../../../../styles/global.module.css";
import bg1 from "../../../../assets/pics/bg/bg1.png";
import bg2 from "../../../../assets/pics/bg/bg2.png";
import bg3 from "../../../../assets/pics/bg/bg3.png";
import bg4 from "../../../../assets/pics/bg/bg4.png";
import bg5 from "../../../../assets/pics/bg/bg5.png";
import bg6 from "../../../../assets/pics/bg/bg6.png";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Card = ({ info, ind }) => {
  const bgs = [bg1, bg2, bg3, bg4, bg5, bg6]
  return (
    <Link className={classNames(global_styles.white_rounded_box, styles.main)} key={ind} to={info.to}>
      <div className={styles.head}>
        <img className={styles.image} src={bgs[ind]} />
        <div className={styles.title}>{info.title}</div>
      </div>
      <div className={styles.description}>{info.description}</div>
    </Link>
  );
};

export default Card;
