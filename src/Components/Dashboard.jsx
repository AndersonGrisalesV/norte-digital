import IconHome from "../imgs/icon_home.png";
import IconStar from "../imgs/icon_star.png";
import IconDocum from "../imgs/icon_document.png";
import IconFile from "../imgs/icon_file.png";
import IconPerson from "../imgs/icon_person.png";
import Divider from "../imgs/divider.png";
import NewSalePerson from "../imgs/new_sale_person.png";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.general__container}>
      <div className={styles.side__panel}>
        <div className={styles.icons}>
          <div className={styles.home}>
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
      <div className={styles.container__new__sale}>
        <div className={styles.container__title}>
          <div className={styles.container__new__sales__person}>
            <img
              src={NewSalePerson}
              alt=" new sale person"
              className={styles.new__sale__person}
            />
          </div>
          <div className={styles.new__sale__divider}>
            <h1>New Sale</h1>
            <div className={styles.container__divider}>
              <img src={Divider} alt="divider" className={styles.divider} />
            </div>
          </div>
        </div>

        <div className={styles.container__client}></div>

        <div className={styles.container__details}></div>

        <div className={styles.container__buttons__total}></div>
      </div>
    </div>
  );
};

export default Dashboard;
