import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Divider from "../imgs/divider.png";
import NewSalePerson from "../imgs/new_sale_person.png";
import styles from "./Dashboard.module.css";
import Button from "./Button/Button";
import AddedProduct from "./AddedProduct/AddedProduct";
import dataArray from "./Data/data";
import SidePanel from "./SidePanel/SidePanel";

const countryCurrencyMap = {
  Argentina: "AR",
  Chile: "CLP",
  Peru: "PEN",
  Colombia: "COP",
  Ecuador: "USD",
  Mexico: "MXN",
  USA: "USD",
  Canada: "CAD",
  Brasil: "BRL",
  Japan: "JPY",
  // Add more countries and their currency codes as needed
};

const Dashboard = () => {
  const navigate = useNavigate();

  // Deep copy the dataArray using JSON methods
  const newDataArray = JSON.parse(JSON.stringify(dataArray));

  const [data, setData] = useState(newDataArray);

  const [client, setClient] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [existingUser, setExistingUser] = useState(false);
  const [successAddedUser, setSuccessAddedUser] = useState(false);

  const [showOverlayClient, setShowOverlayClient] = useState(false);

  const [branch, setBranch] = useState("");
  const [allBranches, setAllBranches] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [showOverlayBranches, setShowOverlayBranches] = useState(false);

  const [currency, setCurrency] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkIfStillResults, setCheckIfStillResults] = useState(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [subtotal, setSubtotal] = useState("");

  const [showOverlayProduct, setShowOverlayProduct] = useState(false);

  const [total, setTotal] = useState("");
  const [addedProduct, setAddedProduct] = useState(false);
  const [addedSale, setAddedSale] = useState(false);
  const [arrayDetails, setArrayDetails] = useState([]);

  const [arraySaleList, setArraySaleList] = useState([]);

  const [showSaleList, setShowSaleList] = useState(false);
  const [turnOnButtonSales, setTurnOnButtonSales] = useState(false);

  const [showDetailSale, setShowDetailSale] = useState(false);

  const handleClickHome = () => {
    navigate("/home");
  };

  const handleClientChange = (event) => {
    const userInput = event.target.value;

    setClient(userInput);

    if (userInput === "") {
      setShowOverlayClient(false);
      setClient("");
      setSelectedClient(false);
      setSelectedBranch(false);
      setSelectedProduct(false);

      // setBranch("");
      // setCurrency("");
    } else {
      // Filter the clients based on the user's input
      const matchingClients = data.clients.filter((client) =>
        client.name.toLowerCase().includes(userInput.toLowerCase())
      );

      // Limit the number of matching clients to 5
      const limitedMatchingClients = matchingClients.slice(0, 5);

      setFilteredClients(limitedMatchingClients);

      // Show the overlay only if there are matching clients
      setShowOverlayClient(limitedMatchingClients.length > 0);

      // User already exists
      const checkUserExists = (data, userInput) => {
        const existingClients = data.clients.filter((client) =>
          client.name.toLowerCase().includes(userInput.toLowerCase())
        );

        // If the length of existingClients is greater than 0, user already exists
        return existingClients.length > 0;
      };

      // Check if in all the array there are still results to show
      setCheckIfStillResults(
        matchingClients && limitedMatchingClients.length >= 5 ? true : false
      );

      const userExists = checkUserExists(data, userInput);

      if (userExists && !selectedClient) {
        setExistingUser(false);
      } else if (userInput !== "") {
        setExistingUser(null);
      }
    }
    if (userInput !== client) {
      setSelectedClient(null);
    }
  };

  const handleClientSelect = (clientData) => {
    setSelectedClient(clientData);

    // Assuming you have an array called "clientsDataArray" containing all the client data
    // const matchingClient = clientData.find((client) => client.RUT === clientData.RUT);

    setClient(clientData.name);
    setBranch(clientData.branchOffice);
    setCurrency(countryCurrencyMap[clientData.branchOffice]);
    setName("");
    setQuantity("");
    setPrice("");
    setSubtotal("");
    setExistingUser(false);
    setShowOverlayClient(false);
    console.log(clientData);
  };

  const handleAddNewClient = () => {
    setShowOverlayClient(false);
    setShowOverlayBranches(false);

    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const generateRUT = () => {
      // Generate random numbers for the RUT
      const firstPart = generateRandomNumber(10000000, 99999999);
      const secondPart = generateRandomNumber(0, 9);

      // Combine the random numbers in the format of a RUT
      const generatedRUT = `${firstPart}-${secondPart}`;

      return generatedRUT;
    };

    // Generate a unique RUT for the new client
    const generatedRUT = generateRUT();

    // Rest of the code remains the same as before
    // ...

    // New client data with placeholders for missing fields
    const newClient = {
      RUT: generatedRUT,
      name: client,
      lastName: client + " last name",
      branchOffice: branch,
      address: {
        street: client + " Street",
        number: generateRandomNumber(1, 100), // Replace this with a random number generation method
        commune: "New Client Commune",
        city: "New Client City",
      },
      phone: "New Client Phone",
    };

    // Check if the client already exists in the clients array BY NAME
    const isClientExisting = data.clients.some(
      (existingClient) => existingClient.name === client
    );

    if (isClientExisting) {
      // Client already exists, set existingUser state to true
      setExistingUser(true);
    } else {
      // Client is new, add it to the clients array
      setData((prevData) => ({
        ...prevData,
        clients: [...prevData.clients, newClient],
      }));

      // Now you can use the updatedClients array in your application state
      setSuccessAddedUser(true);
      // Reset successAddedUser to false after 300 seconds
      if (!addedSale) {
        setTimeout(() => {
          setSuccessAddedUser(false);
          setClient("");
          setBranch("");
          setCurrency("");
          setExistingUser(false); // Reset the existingUser state as well
        }, 3000); // 300 seconds (5 minutes) in milliseconds
      }
    }
  };

  const handleBranchChange = (event) => {
    const userBranch = event.target.value;

    setBranch(userBranch);

    if (userBranch === "") {
      setShowOverlayBranches(false);
      setBranch("");
      setCurrency("");
    } else {
      // Filter the clients based on the user's input

      const AllBranches = data.branchOffices.filter((branch) =>
        branch.toLowerCase().includes(userBranch.toLowerCase())
      );
      // Limit the number of matching clients to 5
      const limitedMatchingBranches = AllBranches.slice(0, 5);

      setAllBranches(limitedMatchingBranches);

      // Show the overlay only if there are matching clients
      setShowOverlayBranches(AllBranches.length > 0);
    }

    // if (userBranch !== client) {
    //   setSelectedClient(null);
    // }
  };

  const handleBranchSelect = (BranchData) => {
    setSelectedBranch(BranchData);

    // Assuming you have an array called "clientsDataArray" containing all the client data
    // const matchingClient = clientData.find((client) => client.RUT === clientData.RUT);
    setBranch(BranchData);
    setCurrency(countryCurrencyMap[BranchData]);

    setShowOverlayBranches(false);
  };

  const handleBranchFocus = () => {
    if (!selectedBranch) {
      // Filter the clients based on the user's input
      const AllBranches = data.branchOffices.filter((branch) => branch);

      // Limit the number of matching clients to 5
      const limitedMatchingBranches = AllBranches.slice(0, 5);

      setAllBranches(limitedMatchingBranches);
    } else {
      setShowOverlayBranches(true);
    }
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleNameChange = (event) => {
    const userName = event.target.value;

    setName(userName);

    if (userName === "") {
      setShowOverlayProduct(false);
      setName("");

      // setBranch("");
      // setCurrency("");
    } else {
      // Filter the clients based on the user's input
      const matchingProducts = data.products.filter(
        (product) =>
          product.name.toLowerCase().includes(userName.toLowerCase()) &&
          product.branch.toLowerCase() === branch.toLowerCase()
      );
      // Limit the number of matching clients to 5
      const limitedMatchingProducts = matchingProducts.slice(0, 5);

      setFilteredProducts(limitedMatchingProducts);

      // Show the overlay only if there are matching clients
      setShowOverlayProduct(limitedMatchingProducts.length > 0);
    }
    if (userName !== name) {
      setSelectedProduct(null);
    }
  };

  const handleQuantityChange = (event) => {
    const quantityValue = parseInt(event.target.value); // Convert the input value to an integer

    if (quantityValue > 0 && quantityValue <= selectedProduct.stock) {
      // If the quantityValue is within the valid range
      setQuantity(quantityValue);
      setSubtotal(quantityValue === 0 ? 0 : price * quantityValue);
    } else {
      // If the quantityValue is not within the valid range, set the input value to an empty string
      event.target.value = "";
    }
  };

  const handlePriceChange = (event) => {
    const priceValue = event.target.value;

    // Check if the input value is negative or less than 1
    if (priceValue < 1) {
      // If it's negative or less than 1, set the input value to 1
      setPrice(1);
      setSubtotal(quantity === "" || quantity < 1 ? 1 : 1 * quantity);
    } else {
      // If it's greater than or equal to 1, update the state with the entered value
      setPrice(priceValue);
      setSubtotal(
        quantity === "" || quantity < 1 ? priceValue : priceValue * quantity
      );
    }
  };

  const handleProductSelect = (productData) => {
    setSelectedProduct(productData);

    // Assuming you have an array called "clientsDataArray" containing all the client data
    // const matchingClient = clientData.find((client) => client.RUT === clientData.RUT);

    setName(productData.name);
    setQuantity(productData.stock === 0 ? 0 : 1);
    setPrice(productData.price);
    setSubtotal(productData.price * productData.stock);

    setShowOverlayProduct(false);
  };

  const handleSubtotalChange = (event) => {
    setSubtotal(event.target.value);
  };

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const handleAddProduct = () => {
    setAddedProduct(true);
    const newProductForSale = {
      id: selectedProduct.id,
      name: name,
      quantity: quantity,
      price: price,
      subtotal: subtotal,
    };
    // Use the setArraySales function to update the state with the new sale
    setArrayDetails((prevArrayDetails) => [
      ...prevArrayDetails,
      newProductForSale,
    ]);

    const newProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      stock: selectedProduct.stock,
      branch: selectedProduct.branch,
    };

    setData((prevData) => {
      const productsCopy = [...prevData.products];
      const productIndex = productsCopy.findIndex(
        (product) => product.id === newProduct.id
      );

      if (productIndex !== -1) {
        // If the product is found, reduce the stock by 1
        if (productsCopy[productIndex].stock > 0) {
          productsCopy[productIndex].stock -= quantity;
        } else {
          // If the stock is already 0 or negative, remove the product from the array
          productsCopy.splice(productIndex, 1);
        }
      }

      return {
        ...prevData,
        products: [...productsCopy],
      };
    });

    setName("");
    setQuantity("");
    setPrice("");
    setSubtotal("");
    setSelectedProduct(false);
  };

  const handleRemoveSale = (index) => {
    if (index == -1) {
      setName("");
      setQuantity("");
      setPrice("");
      setSubtotal("");
      setSelectedProduct(false);
    } else {
      const updatedSales = [...arrayDetails];

      // Remove the sale from the array based on the provided index
      updatedSales.splice(index, 1);
      setArrayDetails(updatedSales);

      // Check if the array is empty, and if so, set addedSale to false
      if (updatedSales.length === 0) {
        setAddedSale(false);
      }
    }
  };

  // Calculate the total sum of subtotals
  useEffect(() => {
    const totalSubtotals = arrayDetails.reduce(
      (acc, sale) => acc + parseInt(sale.subtotal, 10), // Parse sale.subtotal before adding it
      0
    );

    // Update the total state
    setTotal(totalSubtotals);
  }, [arrayDetails]);

  const handleSaveSale = () => {
    setAddedSale(true);

    ////////////////////////////////////////////
    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const generateID = () => {
      // Generate random numbers for the RUT
      const firstPart = generateRandomNumber(10000000, 99999999);
      const secondPart = generateRandomNumber(0, 9);

      // Combine the random numbers in the format of a RUT
      const generatedNumber = `${firstPart}-${secondPart}`;

      return generatedNumber;
    };

    // Generate a unique RUT for the new client
    const generatedID = generateID();

    // Get the current date
    const currentDate = new Date();

    // Format the date to "YYYY-MM-DD"
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Combine the date parts into the desired format
    const formattedDate = `${year}-${month}-${day}`;

    // Generate a random index within the range of the sellers array length
    const randomIndex = Math.floor(Math.random() * data.sellers.length);

    // Access a random seller object from the sellers array using the random index
    const randomSeller = data.sellers[randomIndex];

    // Extract the sellerRUT property from the randomly selected seller object
    const sellerGeneratedRUT = randomSeller;

    // Function to merge arrayDetails with the same ID
    const mergeArrayDetails = (details) => {
      const mergedDetails = [];
      details.forEach((detail) => {
        const matchingDetailIndex = mergedDetails.findIndex(
          (item) => item.id === detail.id
        );
        if (matchingDetailIndex !== -1) {
          // If a matching detail is found, update its quantity and subtotal
          mergedDetails[matchingDetailIndex].quantity += detail.quantity;
          mergedDetails[matchingDetailIndex].subtotal +=
            detail.quantity * detail.price;
        } else {
          // If the detail doesn't exist in the array, add it
          mergedDetails.push(detail);
        }
      });
      return mergedDetails;
    };

    // New sale data with placeholders for missing fields
    const newSale = {
      id: generatedID,
      date: formattedDate,
      clientRUT: selectedClient.RUT,
      sellerRUT: sellerGeneratedRUT,
      lastName: client + " last name",
      branch: branch,
      total: total,
      details: [
        ...mergeArrayDetails(arrayDetails), // Spread the new arrayDetails
      ],
      currency: currency,
    };

    setData((prevData) => {
      // Create a copy of the data.products array
      const updatedProducts = [...prevData.products];

      // Loop through the arrayDetails and update the products with matching names
      arrayDetails.forEach((detail) => {
        const matchingProductIndex = updatedProducts.findIndex(
          (product) => product.id === detail.id
        );

        if (matchingProductIndex !== -1) {
          // If a matching product is found, update its details
          updatedProducts[matchingProductIndex] = {
            ...updatedProducts[matchingProductIndex],
            ...detail,
          };
        }
      });

      // Finally, update the state with the updated products array
      return {
        ...prevData,
        products: updatedProducts,
        sales: [...prevData.sales, newSale], // Add the newSale to the sales array
      };
    });

    // Now you can use the updatedClients array in your application state
    setAddedSale(newSale);

    // Update the arraySaleList state with the newSale

    // Deep copy the dataArray using JSON methods
    // const newDataArray = JSON.parse(JSON.stringify(dataArray));
    // Update the arraySaleList state with the newSale
    // Update the arraySaleList state
    setArraySaleList((prevArray) => {
      // If the previous array is empty, create a new array with the newSale
      if (prevArray.length === 0) {
        return [newSale];
      } else {
        // If the previous array has existing sales, append the newSale to it
        return [...prevArray, newSale];
      }
    });

    setTurnOnButtonSales(true);
  };

  useEffect(() => {
    if (addedSale) {
      // For demonstration purposes, I'm printing the updated clients array
      console.log("old array");
      console.log(dataArray);
      console.log("new array");
      console.log(data);
    }
  }, [data, addedSale]);

  const handleSaleList = () => {
    setShowSaleList(true);
  };

  const handleInvoiceClose = () => {
    setAddedSale(false);
    setClient("");
    setBranch("");
    setCurrency("");
    setName("");
    setQuantity("");
    setPrice("");
    setSubtotal("");
    setTotal("");
    setSelectedClient(false);
    setSelectedBranch(false);
    setSelectedProduct(false);
    setAddedProduct(false);
    setArrayDetails([]);
  };

  const handleDetailSale = (detailsSale) => {
    setShowDetailSale(detailsSale);
  };

  const handleSaleListClose = () => {
    setShowSaleList(false);
    setAddedSale(false);
    setClient("");
    setBranch("");
    setCurrency("");
    setName("");
    setQuantity("");
    setPrice("");
    setSubtotal("");
    setTotal("");
    setSelectedClient(false);
    setSelectedBranch(false);
    setSelectedProduct(false);
    setAddedProduct(false);
  };

  const handleGoBackSaleList = () => {
    setShowDetailSale(false);
    setShowSaleList(true);
  };

  return (
    <div className={styles.container__outside}>
      <SidePanel onGoHome={handleClickHome} />
      <div className={styles.general__container}>
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
            <div className={styles.container__divider}>
              <h1>Document</h1>
              <hr className={styles.horizontal__divider} />
            </div>
            <div className={styles.container__inputs}>
              <div
                className={
                  existingUser || successAddedUser
                    ? styles.container__client__input_error__correction
                    : styles.container__client__input
                }
              >
                <div className={styles.container__client__text}>
                  <label htmlFor="client">Client</label>
                  <input
                    id="client"
                    value={client}
                    placeholder="Name"
                    type="text"
                    onChange={handleClientChange}
                    // onBlur={handleClientBlur}
                    // onFocus={handleClientFocus}
                  />
                  {existingUser && (
                    <div className={styles.container__error__success}>
                      <p
                        className={
                          successAddedUser
                            ? styles.success__added__user
                            : styles.error__existing__user
                        }
                      >
                        {successAddedUser
                          ? "New user added"
                          : "User already exist"}
                      </p>
                    </div>
                  )}
                  {successAddedUser && (
                    <div className={styles.container__error__success}>
                      <p
                        className={
                          successAddedUser
                            ? styles.success__added__user
                            : styles.error__existing__user
                        }
                      >
                        {successAddedUser
                          ? "New user added"
                          : "User already exist"}
                      </p>
                    </div>
                  )}
                  {/* Overlay Client*/}
                  <div className={styles.overlay}>
                    {showOverlayClient && (
                      <>
                        <ul className={styles.client__list}>
                          {filteredClients.map((clientName) => (
                            <li
                              key={clientName.RUT}
                              onClick={() => handleClientSelect(clientName)}
                            >
                              {clientName.name}
                            </li>
                          ))}
                        </ul>
                        <label>
                          {checkIfStillResults && client.length <= 1
                            ? `There are more results with ${client}`
                            : ``}
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.container__button}>
                  <Button
                    onPlusHandleClient={handleAddNewClient}
                    onDisable={
                      selectedClient || !client || !branch || !currency
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              <div className={styles.container__branch__input}>
                <div className={styles.container__branch__text}>
                  <label htmlFor="branch">Branch office</label>
                  <input
                    id="branch"
                    value={branch}
                    placeholder="Type the branch office (e.g., Colombia)"
                    type="text"
                    onChange={handleBranchChange}
                    disabled={selectedClient ? true : false}
                    onFocus={handleBranchFocus}
                  />
                  {/* Overlay Branches*/}
                  {showOverlayBranches && (
                    <div className={styles.overlay__branches}>
                      <ul className={styles.client__list}>
                        {allBranches.map((branch, index) => (
                          <li
                            key={index}
                            onClick={() => handleBranchSelect(branch)}
                          >
                            {branch}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container__details}>
            <div className={styles.container__divider}>
              <h1>Details</h1>
              <hr className={styles.horizontal__divider} />
            </div>
            <div className={styles.container__details__inputs}>
              <div className={styles.container__name__input}>
                <div className={styles.container__name__text}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={name}
                    placeholder="Product"
                    type="text"
                    onChange={handleNameChange}
                    disabled={selectedClient ? false : true}
                  />

                  {/* Overlay Product*/}
                  {showOverlayProduct && (
                    <div className={styles.overlay__products}>
                      <ul className={styles.client__list}>
                        {filteredProducts.map((productName) => (
                          <li
                            key={productName.id}
                            onClick={() => handleProductSelect(productName)}
                          >
                            {productName.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.container__quantity__input}>
                <div className={styles.container__quantity__text}>
                  <label
                    htmlFor="quantity"
                    style={quantity === 0 ? { color: "red" } : {}}
                  >
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    value={quantity}
                    placeholder="0"
                    type="number"
                    inputMode="numeric"
                    onChange={handleQuantityChange}
                    disabled={selectedClient ? false : true}
                    style={quantity === 0 ? { color: "red" } : {}}
                  />
                </div>
              </div>

              <div className={styles.container__price__input}>
                <div className={styles.container__price__text}>
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    value={price}
                    placeholder="0"
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
                    placeholder="0"
                    type="text"
                    onChange={handleSubtotalChange}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.container__button__remove}>
                <Button
                  onRemoveSale={() => handleRemoveSale(-1)}
                  onDisable={selectedProduct ? false : true}
                />
              </div>
            </div>
            <br />
          </div>

          {addedProduct && (
            <div className={styles.container__added__sales}>
              {arrayDetails.map((sale, index) => (
                <AddedProduct
                  key={index}
                  name={sale.name}
                  quantity={sale.quantity}
                  price={sale.price}
                  subtotal={sale.subtotal}
                  onRemove={() => handleRemoveSale(index)} // Pass the handleRemoveSale function to the AddedSale component
                />
              ))}
            </div>
          )}

          <div className={styles.container__buttons__total}>
            <div className={styles.container__button__add}>
              <Button
                onAddSale={handleAddProduct}
                onDisable={selectedProduct && quantity !== 0 ? false : true}
              />
            </div>

            <div className={styles.container__total__input}>
              <div className={styles.container__total__text}>
                <label htmlFor="total">Total</label>
                <input
                  id="total"
                  placeholder="0"
                  value={total}
                  type="text"
                  onChange={handleTotalChange}
                  disabled
                />
              </div>
            </div>
            <div className={styles.container__divider__total}>
              <hr className={styles.horizontal__divider} />
            </div>
            <div className={styles.container__button__save}>
              <Button
                onSave={handleSaveSale}
                onDisable={
                  selectedClient &&
                  !selectedProduct &&
                  arrayDetails.length > 0 &&
                  total !== 0
                    ? false
                    : true
                }
              />
              {arraySaleList ? (
                <Button
                  onSaleList={handleSaleList}
                  onDisable={turnOnButtonSales ? false : true}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* Add the overlay and card for one saved sale */}
        {addedSale && (
          <div
            className={styles.overlay__sale__invoice}
            onClick={handleInvoiceClose}
          >
            <div className={styles.card}>
              {/* Sale details */}
              <h2>Sale Details</h2>

              <ul className={styles.sale__details}>
                <li key={addedSale.id}>
                  <strong>Client:</strong> {client}
                  <br />
                  <strong>Branch Office:</strong> {branch}
                  <br />
                  <strong>Currency:</strong> {currency}
                </li>
              </ul>

              <h3>Detail products</h3>
              <ul className={styles.sale__details}>
                {addedSale.details.map((detail, index) => (
                  <li key={index}>
                    <strong>Id:</strong> {detail.id},
                    <br />
                    <strong>Name:</strong> {detail.name},
                    <br />
                    <strong>Quantity:</strong> {detail.quantity}{" "}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total:</strong> {total}
              </p>
              {/* Close button */}
              <Button onCloseInvoiceSale={handleInvoiceClose} />
            </div>
          </div>
        )}
        {/* Add the overlay and card for list of sales */}
        {showSaleList && (
          <div
            className={styles.overlay__sale__invoice}
            onClick={handleSaleListClose}
          >
            <div className={styles.card}>
              {/* Sales */}
              <h2>Sales</h2>

              <ul className={styles.sale__details}>
                {JSON.parse(JSON.stringify(arraySaleList)).map(
                  (sale, index) => (
                    <li key={index} onClick={() => handleDetailSale(sale)}>
                      <span>
                        <strong>Id:</strong> {sale.id}
                        <br />
                        <strong>Date:</strong> {sale.date}
                        <br />
                        <strong>Seller RUT:</strong>{" "}
                        {JSON.parse(JSON.stringify(sale.sellerRUT.RUT))}
                        <br />
                        <strong>Client RUT:</strong>{" "}
                        {JSON.parse(JSON.stringify(sale.clientRUT))}
                      </span>
                    </li>
                  )
                )}
              </ul>

              {/* Close button */}
              <Button onCloseInvoiceSale={handleSaleListClose} />
            </div>
          </div>
        )}
        {/* Add the overlay and card for  detail sale */}
        {showDetailSale && (
          <div
            className={styles.overlay__sale__invoice}
            onClick={handleGoBackSaleList}
          >
            <div className={styles.card}>
              {/* Sale details */}
              <h2>Sale Details</h2>

              <ul className={styles.sale__details}>
                <li key={showDetailSale.id}>
                  <strong>Sale ID:</strong> {showDetailSale.id}
                  <br />
                  <strong>Date:</strong> {showDetailSale.date}
                  <br />
                  <strong>Product:</strong> {showDetailSale.details[0].name}
                  <br />
                  <strong>Client RUT:</strong> {showDetailSale.clientRUT}
                  <br />
                  <strong>Branch Office:</strong> {showDetailSale.branch}
                  <br />
                  <strong>Currency:</strong> {showDetailSale.currency}
                  <br />
                  <strong>Total:</strong> {showDetailSale.total}
                </li>
              </ul>

              {/* Close button */}
              <Button onCloseSaleList={handleGoBackSaleList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
