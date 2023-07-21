import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconHome from "../imgs/icon_home.png";
import IconStar from "../imgs/icon_star.png";
import IconDocum from "../imgs/icon_document.png";
import IconFile from "../imgs/icon_file.png";
import IconPerson from "../imgs/icon_person.png";
import Divider from "../imgs/divider.png";
import NewSalePerson from "../imgs/new_sale_person.png";
import styles from "./Dashboard.module.css";
import Button from "./Button/Button";
import AddedSale from "./Sections/AddedSale";

const Dashboard = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState("");
  const [branch, setBranch] = useState("");
  const [currency, setCurrency] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [addedSale, setAddedSale] = useState(false);

  const handleClickHome = () => {
    navigate("/home");
  };

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubtotalChange = (event) => {
    setSubtotal(event.target.value);
  };

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const [arraySales, setArraySales] = useState([]);

  const handleAddSale = () => {
    setAddedSale(true);
    const newSale = {
      name: name,
      quantity: quantity,
      price: price,
      subtotal: subtotal,
    };
    // Use the setArraySales function to update the state with the new sale
    setArraySales((prevArraySales) => [...prevArraySales, newSale]);
  };

  return (
    <div className={styles.general__container}>
      <div className={styles.side__panel}>
        <div className={styles.icons}>
          <div className={styles.home} onClick={handleClickHome}>
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
              alt="new sale person"
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

        <div className={styles.container__client}>
          <h1>Document</h1>
          <div className={styles.container__inputs}>
            <div className={styles.container__client__input}>
              <div className={styles.container__client__text}>
                <label htmlFor="client">Client</label>
                <input
                  id="client"
                  value={client}
                  type="text"
                  onChange={handleClientChange}
                />
              </div>
              <div className={styles.container__button}>
                <Button onPlusClient={true} />
              </div>
            </div>
            <div className={styles.container__branch__input}>
              <div className={styles.container__branch__text}>
                <label htmlFor="branch">Branch office</label>
                <input
                  id="branch"
                  value={branch}
                  type="text"
                  onChange={handleBranchChange}
                />
              </div>
            </div>
            <div className={styles.container__currency__input}>
              <div className={styles.container__currency__text}>
                <label htmlFor="currency">Currency</label>
                <input
                  id="currency"
                  value={currency}
                  type="text"
                  onChange={handleCurrencyChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container__details}>
          <h1>Details</h1>
          <div className={styles.container__details__inputs}>
            <div className={styles.container__name__input}>
              <div className={styles.container__name__text}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={name}
                  type="text"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className={styles.container__quantity__input}>
              <div className={styles.container__quantity__text}>
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  value={quantity}
                  type="number"
                  inputMode="numeric"
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className={styles.container__price__input}>
              <div className={styles.container__price__text}>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  value={price}
                  type="number"
                  onChange={handlePriceChange}
                  disabled
                />
              </div>
            </div>

            <div className={styles.container__subtotal__input}>
              <div className={styles.container__subtotal__text}>
                <label htmlFor="subtotal">Subtotal</label>
                <input
                  id="subtotal"
                  value={subtotal}
                  type="text"
                  onChange={handleSubtotalChange}
                  disabled
                />
              </div>
            </div>
            <div className={styles.container__button__remove}>
              <Button onRemoveSale={true} />
            </div>
          </div>
        </div>

        {addedSale && (
          <div className={styles.container__added__sales}>
            {arraySales.map((sale, index) => (
              <AddedSale
                key={index}
                name={sale.name}
                quantity={sale.quantity}
                price={sale.price}
                subtotal={sale.subtotal}
              />
            ))}
          </div>
        )}

        <div className={styles.container__buttons__total}>
          <div className={styles.container__button__add}>
            <Button onAddSale={handleAddSale} />
          </div>
          <div className={styles.container__total__input}>
            <div className={styles.container__total__text}>
              <label htmlFor="total">Total</label>
              <input
                id="total"
                value={total}
                type="text"
                onChange={handleTotalChange}
              />
            </div>
          </div>
          <div className={styles.container__button__save}>
            <Button onSave={"Save"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
