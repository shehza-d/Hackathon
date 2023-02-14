import { useEffect, useState } from "react";

export default function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const arrayOfCarts = JSON.parse(localStorage.getItem("cartList")) || [];
    setData(arrayOfCarts);
  }, []);
  return (
    <>
      <button>Delete</button>
	  <div>
		{
        //   {searchFun()?.map((item, i) => ()}
		}
	  </div>
    </>
  );
}
