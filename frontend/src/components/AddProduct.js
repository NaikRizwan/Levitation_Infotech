// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const AddProduct = () => {
//   const { state } = useUser();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([
//     { name: "", qty: 0, rate: 0, total: 0 },
//   ]);

//   useEffect(() => {
//     if (!state.loggedIn) {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [state.loggedIn, navigate]);

//   const handleProductChange = (index, field, value) => {
//     const newProducts = [...products];
//     newProducts[index][field] = value;
//     newProducts[index].total = newProducts[index].qty * newProducts[index].rate;
//     setProducts(newProducts);
//   };

//   const addProduct = () => {
//     setProducts([...products, { name: "", qty: 0, rate: 0, total: 0 }]);
//   };

//   const handleNext = () => {
//     localStorage.setItem("products", JSON.stringify(products));
//     navigate("/generate-invoice");
//   };

//   const calculateGST = (total) => (total * 0.18).toFixed(2);

//   return (
//     <div className="mt-20 p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
//       <h1 className="text-2xl font-bold mb-4">Add Products</h1>
//       {products.map((product, index) => (
//         <div key={index} className="mb-4 flex flex-wrap">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={product.name}
//             onChange={(e) => handleProductChange(index, "name", e.target.value)}
//             className="w-full md:w-auto mr-2 mb-2 p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Qty"
//             value={product.qty}
//             onChange={(e) => handleProductChange(index, "qty", e.target.value)}
//             className="w-full md:w-auto mr-2 mb-2 p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Rate"
//             value={product.rate}
//             onChange={(e) => handleProductChange(index, "rate", e.target.value)}
//             className="w-full md:w-auto mr-2 mb-2 p-2 border border-gray-300 rounded"
//           />
//           <span className="w-full md:w-auto mr-2 mb-2 p-2 border border-gray-300 rounded">
//             Total: {product.total}
//           </span>
//           <span className="w-full md:w-auto mb-2 p-2 border border-gray-300 rounded">
//             GST: {calculateGST(product.total)}
//           </span>
//         </div>
//       ))}
//       <div className="flex justify-center">
//         <button
//           onClick={addProduct}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mx-2"
//         >
//           Add Product
//         </button>
//         <button
//           onClick={handleNext}
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mx-2"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  FiPlusCircle,
  FiArrowRight,
  FiPackage,
  FiHash,
  FiDollarSign,
  FiPercent,
} from "react-icons/fi";

const AddProduct = () => {
  // const { state } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { name: "", qty: 0, rate: 0, total: 0 },
  ]);
  const { state, dispatch } = useUser();

  const callAbout = async () => {
    try {
      const response = await fetch(
        "https://levitation-infotech.vercel.app/about",

        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.status === 400 || !data) {
        dispatch({ type: "CLEAR_USER" });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.full_name,
            email: data.email,
            role: data.role,
            img: data.profileImage,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "CLEAR_USER" });
    }
  };

  useEffect(() => {
    callAbout();
  }, [state.loggedIn]);

  // useEffect(() => {
  //   if (!state.loggedIn) {
  //     navigate("/login"); // Redirect to login if not authenticated
  //   }
  // }, [state.loggedIn, navigate]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    newProducts[index].total = newProducts[index].qty * newProducts[index].rate;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", qty: 0, rate: 0, total: 0 }]);
  };

  const handleNext = () => {
    localStorage.setItem("products", JSON.stringify(products));
    navigate("/generate-invoice");
  };

  const calculateGST = (total) => (total * 0.18).toFixed(2);

  return (
    <div className="mt-20 p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-semibold mb-4">
        <span className="flex items-center">
          <FiPackage className="mr-2" /> Product Name
        </span>
        <span className="flex items-center">
          <FiHash className="mr-2" /> Qty
        </span>
        <span className="flex items-center">
          <FiDollarSign className="mr-2" /> Rate
        </span>
        <span className="flex items-center">Total</span>
        <span className="flex items-center">
          <FiPercent className="mr-2" /> GST
        </span>
      </div>

      {products.map((product, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4"
        >
          <div className="flex items-center mb-2 md:mb-0">
            <FiPackage className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) =>
                handleProductChange(index, "name", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center mb-2 md:mb-0">
            <FiHash className="text-gray-500 mr-2" />
            <input
              type="number"
              placeholder="Qty"
              value={product.qty}
              onChange={(e) =>
                handleProductChange(index, "qty", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center mb-2 md:mb-0">
            <FiDollarSign className="text-gray-500 mr-2" />
            <input
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) =>
                handleProductChange(index, "rate", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center mb-2 md:mb-0">
            <span className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center">
              {product.total}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center">
              {calculateGST(product.total)}
            </span>
          </div>
        </div>
      ))}

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={addProduct}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlusCircle className="h-5 w-5" />
          <span>Add Product</span>
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <span>Next</span>
          <FiArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
