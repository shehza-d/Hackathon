import { useEffect, useState } from "react";
import {
  getFirestore,
  collection, //get reference to a collection
  addDoc,
  getDocs, //get all docs
  getDoc, //get one doc
  doc, //get reference to a document
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase";

export default function AllProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [refresh] = useState(false);

  useEffect(() => {
    (async () => {
      let tempArr = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(tempArr);
      setData(tempArr);
    })();
  }, [refresh]);

  console.log(data);

  const searchFun = () => {
    return data.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchQuery) ||
        item.productDescription.toLowerCase().includes(searchQuery) ||
        item.productType.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery)
    );
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/hackathon-2023-smit.appspot.com/o/product-images%2F1676205512998?alt=media&token=84ba24d4-d6a2-42b3-ace4-049a1acd0ad3"
          alt=""
        />
        <input
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
        <div>
          {searchFun()?.map((item, i) => (
            <Product
              key={i}
              name={item?.productName}
              img={item?.productImage}
              category={item?.category}
              productDescription={item?.productDescription}
              unitPrice={item?.unitPrice}
              unitType={item?.unitType}
            />
          ))}
        </div>
      </div>
    </>
  );
}
// const navigate = useNavigate();
// onClick={() => navigate("/employees")}
const Product = (props) => {
  const { name, img, category, productDescription, unitPrice, unitType } =
    props;

  return (
    <div style={{}}>
      <div style={{}}>
        <img src={img} alt="" width={52} height={52} />
        <div style={{}}>
          <h3 style={{}}>{name}</h3>
          <h6 style={{}}>{productDescription}</h6>
        </div>
      </div>
      <div>
        <p style={{}}>{`${unitPrice} - ${unitType}`}</p>
		<button>+</button>
      </div>
    </div>
  );
};
