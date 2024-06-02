// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const GenerateInvoice = () => {
//   const { state } = useUser();
//   const navigate = useNavigate();
//   const products = JSON.parse(localStorage.getItem("products"));

//   useEffect(() => {
//     if (!state.loggedIn) {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [state.loggedIn, navigate]);

//   const generatePDF = async () => {
//     // Send request to backend to generate PDF
//     const response = await fetch("/api/invoices", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: state.email, // Include email in the request body
//         products,
//         date: new Date().toISOString(),
//       }),
//     });

//     if (response.ok) {
//       // Get the PDF blob from response
//       const pdfBlob = await response.blob();
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const link = document.createElement("a");
//       link.href = pdfUrl;
//       link.download = "invoice.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error("Failed to generate invoice");
//     }
//   };

//   return (
//     <div className="mt-20 p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
//       <h1 className="text-2xl font-bold mb-4">Generate Invoice</h1>
//       <div className="flex justify-center">
//         <button
//           onClick={generatePDF}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           Generate Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GenerateInvoice;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateInvoice = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem("products"));

  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [state.loggedIn, navigate]);

  const generatePDF = async () => {
    try {
      const response = await fetch("/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          products,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // If response is 200, generate PDF on the frontend
        const doc = new jsPDF();
        doc.text("Invoice", 20, 20);
        doc.text(`Email: ${state.email}`, 20, 30);
        doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);

        const tableColumn = ["Product Name", "Qty", "Rate", "Total"];
        const tableRows = [];

        products.forEach((product) => {
          const productData = [
            product.name,
            product.qty,
            product.rate,
            product.total,
          ];
          tableRows.push(productData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 50 });
        doc.save("invoice.pdf"); // Save the PDF locally
      } else {
        console.error("Failed to store invoice data");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  const showInvoices = () => {
    navigate("/profile");
  };

  return (
    <div className="mt-20 p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Generate Invoice</h1>
      <div className="flex justify-center space-x-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Invoice
        </button>
        <button
          onClick={showInvoices}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Show All Invoices
        </button>
      </div>
    </div>
  );
};

export default GenerateInvoice;
