import IconHome from "../../imgs/icon_home.png";
import IconStar from "../../imgs/icon_star.png";
import IconDocum from "../../imgs/icon_document.png";
import IconFile from "../../imgs/icon_file.png";
import IconPerson from "../../imgs/icon_person.png";
import styles from "./SidePanel.module.css";

const SidePanel = ({ onGoHome = null }) => {
  return (
    <div className={styles.side__panel}>
      <div className={styles.icons}>
        <div className={styles.home} onClick={onGoHome}>
          <img src={IconHome} alt=" home icon" />
        </div>
        <div className={styles.star}>
          <img src={IconStar} alt="star icon" />
        </div>
        <div className={styles.docu}>
          <img src={IconDocum} alt=" document icon" />
        </div>
        <div className={styles.file}>
          <img src={IconFile} alt="file icon" />
        </div>
        <div className={styles.person}>
          <img src={IconPerson} alt="person icon" />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
