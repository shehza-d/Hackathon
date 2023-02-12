import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { GlobalContext } from "../../context/context";

// Importing Firebase functions from the SDKs
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitType, setUnitType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  // const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  console.log(category);

  const { state, dispatch } = useContext(GlobalContext);

  const handlePicChange = (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];

    // to display image instantly on screen
    const pictureInput = document.querySelector("#productImg");
    const url = URL.createObjectURL(pictureInput.files[0]);
    // console.log("img url: ", url);
    document.querySelector(
      "#previewProductImg"
    ).innerHTML = `<img width="200px" src="${url}" alt="productImage" id="img"/>`;
    setProductImage(selectedFile);
    console.log("productImg", e.target.files[0]);
    console.log("url", selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `product-images/${Date.now()}`);
    // console.log(storageRef._location.path);
    uploadBytes(storageRef, productImage).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, `products`), {
          productName,
          productDescription,
          unitType,
          unitPrice,
          category,
          productImage: url,
        }).then(() => toast(`Product added successfully`));
      });
    });
  };
  return (
    <>
      <ToastContainer />

      <h2> Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div id="previewProductImg" alt=""></div>
        <input
          required
          // className="input"
          type="file"
          accept="image/*"
          // ref={fileRef}
          //   autoComplete="on"
          id="productImg"
          placeholder="Product Picture..."
          // name="productImg"
          // value={values.productImg}
          onChange={handlePicChange}
          // onBlur={handleBlur}
        />
        <input
          required
          type="text"
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Item Name"
        />
        <select
          required
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          id="category"
        >
          <option value="fruit" defaultValue>
            Fruit
          </option>
          <option value="meat">Meat</option>
          <option value="vegetable">Vegetable</option>
        </select>
        <input
          type="text"
          required
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Describe this Item"
        />

        <label htmlFor="unitType">Unit Type :</label>
        <input
          type="text"
          name="unitType"
          required
          onChange={(e) => setUnitType(e.target.value)}
          placeholder="Pcs. / Kg / dozen"
        />

        <label htmlFor="unitPrice">Unit Price :</label>
        <input
          type="text"
          required
          onChange={(e) => setUnitPrice(e.target.value)}
          placeholder="PKR 352.5"
        />
        <button>Add Product</button>
      </form>
    </>
  );
}
