// import { EllipsisOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
// import {
//   Button,
//   ConfigProvider,
//   Input,
//   Modal,
//   Popover,
//   Switch,
//   Table,
//   Tooltip,
// } from "antd";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { GrDownload } from "react-icons/gr";
// import { IoSearchOutline } from "react-icons/io5";
// import AddProductForm from "../UI/ProductModals/CreateProduct";
// import EditProductForm from "../UI/ProductModals/EditProduct";
// import ProductDetailsModal from "../UI/ProductModals/ProductDetailsModal";
// import { useActiveDeactiveStatusProductMutation, useDeleteProductMutation, useGetAllProductsQuery } from "../../Redux/api/product";
// import Swal from "sweetalert2";


// const Products = () => {
//   const [data, setData] = useState([]); // All products
//   const [filteredData, setFilteredData] = useState([]); // Filtered products based on search
//   console.log(data);
//   const [loading, setLoading] = useState(true);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState(""); // New state to manage search query

//   const {data:products, isLoading, refetch} = useGetAllProductsQuery(null);
//   const [activeDeactiveProduct] = useActiveDeactiveStatusProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();
//   console.log(products?.data);
//   // console.log(first);
  
 
//   // Filter products based on search text
//   useEffect(() => {
//     if (searchText.trim() === "") {
//       setFilteredData(products?.data); // If search is empty, show all products
//     } else {
//       const lowercasedSearchText = searchText.toLowerCase();
//       const filtered = products?.data?.filter(
//         (product) =>
//           product.productName.toLowerCase().includes(lowercasedSearchText) ||
//           product.categoryName.toString().includes(lowercasedSearchText) // You can filter by other fields too (e.g., product id)
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchText, products?.data]);

//   const showDetailsModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalVisible(true);
//   };
//   const closeDetailsModal = () => {
//     setIsModalVisible(false);
//     setSelectedProduct(null);
//   };

//   const handleSwitchChange = async(checked, record) => {
//     console.log("Current Value:", checked);
//     console.log("Record Data:", record);
//     try {
//       //  console.log({formData});
       
//           const response = await activeDeactiveProduct(record._id).unwrap();
//           console.log("category response:", response);
    
//           if (response.success === true) {
            
//             // toast.success("OTP verified successfully!");
//             Swal.fire({
//               icon: "success",
//               title: "Success!",
//               text: response.message,
//             });
    
//             refetch();
            
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           if (error.data?.message) {
//             // toast.error("Invalid OTP. Please try again.");
//             Swal.fire({
//               icon: "error",
//               title: "Error!",
//               text: error.data?.message,})
//           } else {
//             // toast.error("Failed to verify OTP. Please try again.");
//             Swal.fire({
//               icon: "error",
//               title: "Error!",
//               text: "Failed to deleted category. Please try again.",})
//           }
//         }
//   };

//   const columns = [
//     {
//       title: "S.ID",
//       dataIndex: "id",
//       render: (text, record, index) => `${index + 1}`,
//       key: "id",
//     },
//     {
//       title: "Image",
//       dataIndex: "images",
//       key: "images",
//       render: (images) => (
//         <div className="flex space-x-2">
//           {images && images.length > 0 ? (
//             images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`http://10.0.70.35:8010/${image}`}
//                 alt={`Product Image ${index + 1}`}
//                 className="size-8 rounded-full"
//               />
//             ))
//           ) : (
//             <span>No images</span>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Product",
//       dataIndex: "productName",
//       key: "productName",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price, record) => {
//         // Check if tShirtItems or teaItems have prices
//         if (record.tShirtItems && record.tShirtItems.length > 0) {
//           return `$${record.tShirtItems[0].price} - $${record.tShirtItems[1].price}`; // Display the first T-shirt item's price
//         } else if (record.teaItems && record.teaItems.length > 0) {
//           return `$${record.teaItems[0].price} - ${record.teaItems[1].price}`; // Display the first tea item's price
//         } else {
//           return `$${price}`; // Default to the product's base price
//         }
//       },
//     },
    
    
//     {
//       title: "Stock",
//       dataIndex: "stock",
//       key: "stock",
//     },
//     {
//       title: "Active/Inactive",
//       dataIndex: "isActive",
//       key: "isActive",
//       render: (isActive) => (isActive ? "Active" : "Inactive"),
      
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <div className="flex items-center space-x-2">
//           {/* <Switch defaultChecked={record.status} /> */}
//           <Switch
//         checked={record.isActive} // Dynamically bind to isActive
//         onChange={(checked) => handleSwitchChange(checked, record)}
//       />
//           <Tooltip title="View Details">
//             <Button
//               icon={<EyeOutlined />}
//               onClick={() => showDetailsModal(record)}
//               className="text-lg text-[#1B7443] hover:text-[#FFA500]"
//             />
//           </Tooltip>
//           <Popover
//             content={
//               <div className="flex flex-col space-y-2">
//                 <Button
//                   onClick={() => handleEdit(record)}
//                   className="flex items-center space-x-2 bg-[#32ADE6] font-semibold"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(record)}
//                   className="flex items-center space-x-2 bg-[#FF3B30] text-white font-semibold"
//                 >
//                   Delete
//                 </Button>
//               </div>
//             }
//             trigger="click"
//             placement="bottomRight"
//           >
//             <EllipsisOutlined className="cursor-pointer text-lg" />
//           </Popover>
//         </div>
//       ),
//     },
//   ];

//   const handleOpenAddModal = () => {
//     setIsAddModalVisible(true);
//   };

//   const handleCloseAddModal = () => {
//     setIsAddModalVisible(false);
//   };

//   const handleEdit = (record) => {
    
//     setSelectedProduct(record);
//     setIsEditModalVisible(true);
//   };

//   const handleDelete = async (record) => {
//     Modal.confirm({
//       title: "Do you want to delete this item?",
//       content: `${record.productName} will be permanently deleted.`,
//       okText: "Yes, Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       onOk: async () => {
//         try {
//           const response = await deleteProduct(record._id).unwrap();
  
//           if (response.success) {
//             Swal.fire({
//               icon: "success",
//               title: "Success!",
//               text: "Product deleted successfully.",
//             });
  
//             // setPopoverVisible(null); // Reset popover visibility if any
//             refetch(); // Refresh the data
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Error!",
//             text: error.data?.message || "Failed to delete product. Please try again.",
//           });
//         }
//       },
//     });
//   };
  

//   const handleCloseEditModal = () => {
//     setIsEditModalVisible(false);
//     setSelectedProduct(null);
//   };

//   const handleAddProduct = (productData) => {
//     const allItems = [
//       ...productData.teaItems,
//       ...productData.tShirtItems,
//       ...productData.mugItems,
//       ...productData.toteItems,
//     ];

//     setData(allItems);
//     setFilteredData(allItems); // Update filtered data when new product is added
//     setIsAddModalVisible(false);
//   };

//   const handleEditSubmit = () => {
//     // Submit edited product data
//     setIsEditModalVisible(false);
//   };

//   return (
//     <div className="px-2 min-h-screen">
//       {/* Header */}
//       <Button
//         className="flex items-center h-12 text-xl mb-4 bg-[#B2DAC4] p-4 rounded-lg w-full font-semibold"
//         onClick={handleOpenAddModal}
//       >
//         <PlusOutlined />
//         <p>Add Product</p>
//       </Button>

//       {/* Filters */}
//       <div className="flex items-center justify-between bg-[#1b7443] text-white py-3 px-4 rounded-lg">
//         <h2 className="text-xl font-semibold">Products List</h2>
//         <div className="flex flex-col md:flex-row gap-5">
//           {/* Search Input */}
//           <Input
//             prefix={<IoSearchOutline />}
//             className="px-2 py-2 rounded-md text-gray-400"
//             type="text"
//             placeholder="Search Product"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)} // Update searchText state
//           />

//           {/* Download Button */}
//           {/* <button className="rounded-full bg-white w-10 h-10 md:w-14 flex items-center justify-center">
//             <GrDownload className="text-4xl text-[#1B7443] p-2" />
//           </button> */}
//         </div>
//       </div>

//       {/* Product List Table */}
//       <ConfigProvider
//         theme={{
//           components: {
//             Table: {
//               headerBg: "white",
//               headerColor: "rgb(27,116,67)",
//             },
//           },
//         }}
//       >
//         <Table
//           columns={columns}
//           dataSource={filteredData} // Use filteredData instead of data
//           pagination={{ pageSize: 8 }}
//           loading={isLoading}
//           rowKey="id"
//           className="bg-white rounded-lg shadow-lg"
//         />
//       </ConfigProvider>

//       <ConfigProvider
//         theme={{
//           components: {
//             Modal: {
//               contentBg: "rgb(255,239,217)",
//             },
//             Select: {
//               optionSelectedBg: "rgb(27,116,67)",
//               optionSelectedColor: "rgba(255,255,255,0.88)",
//             },
//           },
//         }}
//       >
//         {/* Add Product Modal */}
//         <Modal
//           open={isAddModalVisible}
//           onCancel={handleCloseAddModal}
//           footer={null}
//           centered
//           width={800}
//         >
//           <AddProductForm onSubmit={handleAddProduct} />
//         </Modal>

//         {/* Edit Product Modal */}
//         <Modal
//           open={isEditModalVisible}
//           onCancel={handleCloseEditModal}
//           footer={null}
//           centered
//           width={800}
//         >
//           <EditProductForm
//             initialValues={selectedProduct}
//             onSubmit={handleEditSubmit}
//           />
//         </Modal>
//       </ConfigProvider>

//       {selectedProduct && (
//         <ProductDetailsModal
//           visible={isModalVisible}
//           onClose={closeDetailsModal}
//           product={selectedProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default Products;


import { EllipsisOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Popover,
  Switch,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrDownload } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import AddProductForm from "../UI/ProductModals/CreateProduct";
// import EditProductForm from "../UI/ProductModals/EditProduct";
import ProductDetailsModal from "../UI/ProductModals/ProductDetailsModal";
import {
  useActiveDeactiveStatusProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../Redux/api/product";
import Swal from "sweetalert2";
import EditProductForm from "../UI/ProductModals/EditProductForm";
import CreateProductForm from "../UI/ProductModals/CreateProductForm";

const Products = () => {
  // const [data, setData] = useState([]); // All products
  const [filteredData, setFilteredData] = useState([]); // Filtered products based on search
  // console.log(data);
  // const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { data: products, isLoading, refetch } = useGetAllProductsQuery(null);
  const [activeDeactiveProduct] = useActiveDeactiveStatusProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  // const [createProduct] = useCreateProductMutation();
  // const {data: products} = useGetAllProductsQuery();
  // console.log(products?.data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/data/products.json");
  //       // console.log(response);
  //       setData(response.data);
  //       setFilteredData(response.data); // Initially show all products
  //     } catch (error) {
  //       // console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(first);

  // Filter products based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredData(products?.data); // If search is empty, show all products
    } else {
      const lowercasedSearchText = searchText.toLowerCase();
      const filtered = products?.data?.filter(
        (product) =>
          product.productName.toLowerCase().includes(lowercasedSearchText) ||
          product.categoryName.toString().includes(lowercasedSearchText)
      );
      setFilteredData(filtered);
    }
  }, [searchText, products?.data]);

  const showDetailsModal = (product) => {
    console.log("showdetails modal", product);
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };
  console.log('details selected',selectedProduct)

  const handleSwitchChange = async (checked, record) => {
    console.log("Current Value:", checked);
    console.log("Record Data:", record);
    try {
      //  console.log({formData});

      const response = await activeDeactiveProduct(record._id).unwrap();
      console.log("category response:", response);

      if (response.success === true) {
        // toast.success("OTP verified successfully!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message,
        });

        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.data?.message) {
        // toast.error("Invalid OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.data?.message,
        });
      } else {
        // toast.error("Failed to verify OTP. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to deleted category. Please try again.",
        });
      }
    }
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      render: (text, record, index) => `${index + 1}`,
      key: "id",
    },
  
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div className="flex space-x-2">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={`http://139.59.0.25:8050/${image}`}
                alt={`Product Image ${index + 1}`}
                className="size-8 rounded-full"
              />
            ))
          ) : (
            <span>No images</span>
          )}
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        if (record.addedItems && record.addedItems.length > 0) {
          // const prices = record.addedItems.map((item) => `$${item.price}`).join(", ");
          const prices = record.addedItems[0].price;
          return `$ ${prices}`; 
        }
        return "N/A"; 
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (_, record) => {
        // Render stocks from addedItems
        if (record.addedItems && record.addedItems.length > 0) {
//           const stocks = record.addedItems.map((item) => `${item.availableStock
// }`).join(", ");
          const stocks = record.addedItems[0].availableStock;
          return stocks;
        }
        return "N/A"; // Fallback if no stock available
      },
    },
    {
      title: "Weight",
      dataIndex: "productWeight",
      key: "productWeight",
      render: (_, record) => `${record?.productWeight || "N/A"} (gm)`,
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {/* <Switch defaultChecked={record.status} /> */}
          <Switch
            checked={record.isActive} // Dynamically bind to isActive
            onChange={(checked) => handleSwitchChange(checked, record)}
          />
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showDetailsModal(record)}
              className="text-lg text-[#1B7443] hover:text-[#FFA500]"
            />
          </Tooltip>
          <Popover
            content={
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={() => handleEdit(record)}
                  className="flex items-center space-x-2 bg-[#32ADE6] font-semibold"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(record)}
                  className="flex items-center space-x-2 bg-[#FF3B30] text-white font-semibold"
                >
                  Delete
                </Button>
              </div>
            }
            trigger="click"
            placement="bottomRight"
          >
            <EllipsisOutlined className="cursor-pointer text-lg" />
          </Popover>
        </div>
      ),
    },
  ];

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleEdit = (record) => {
    setSelectedProduct(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Do you want to delete this item?",
      content: `${record.productName} will be permanently deleted.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await deleteProduct(record._id).unwrap();

          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Product deleted successfully.",
            });

            // setPopoverVisible(null); // Reset popover visibility if any
            refetch(); // Refresh the data
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text:
              error.data?.message ||
              "Failed to delete product. Please try again.",
          });
        }
      },
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  // const handleAddProduct = async (formData) => {
  //   // const allItems = [
  //   //   ...productData.teaItems,
  //   //   ...productData.tShirtItems,
  //   //   ...productData.mugItems,
  //   //   ...productData.toteItems,
  //   // ];

  //   console.log({ formData });

  //   await createProduct(formData);

  //   // setData(allItems);
  //   // setFilteredData(allItems); // Update filtered data when new product is added
  //   setIsAddModalVisible(false);
  // };

  const handleEditSubmit = () => {
    // Submit edited product data
    setIsEditModalVisible(false);
  };

  return (
    <div className="px-2 min-h-screen">
      {/* Header */}
      <Button
        className="flex items-center h-12 text-xl mb-4 bg-[#B2DAC4] p-4 rounded-lg w-full font-semibold"
        onClick={handleOpenAddModal}
      >
        <PlusOutlined />
        <p>Add Product</p>
      </Button>

      {/* Filters */}
      <div className="flex items-center justify-between bg-[#1b7443] text-white py-3 px-4 rounded-lg">
        <h2 className="text-xl font-semibold">Products List</h2>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Search Input */}
          <Input
            prefix={<IoSearchOutline />}
            className="px-2 py-2 rounded-md text-gray-400"
            type="text"
            placeholder="Search Product"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update searchText state
          />

          {/* Download Button */}
          {/* <button className="rounded-full bg-white w-10 h-10 md:w-14 flex items-center justify-center">
            <GrDownload className="text-4xl text-[#1B7443] p-2" />
          </button> */}
        </div>
      </div>

      {/* Product List Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "white",
              headerColor: "rgb(27,116,67)",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredData} // Use filteredData instead of data
          pagination={{ pageSize: 8 }}
          loading={isLoading}
          rowKey="id"
          className="bg-white rounded-lg shadow-lg"
        />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(255,239,217)",
            },
            Select: {
              optionSelectedBg: "rgb(27,116,67)",
              optionSelectedColor: "rgba(255,255,255,0.88)",
            },
          },
        }}
      >
        {/* Add Product Modal */}

        <Modal
          open={isAddModalVisible}
          onCancel={handleCloseAddModal}
          footer={null}
          centered
          width={760}
        >
          {/* <AddProductForm onSubmit={handleAddProduct} /> */}
          <CreateProductForm setIsAddModalVisible={setIsAddModalVisible} />
        </Modal>
        {/* Edit Product Modal */}
        <Modal
          open={isEditModalVisible}
          onCancel={handleCloseEditModal}
          footer={null}
          centered
          width={800}
        >
          <EditProductForm
            // initialValues={selectedProduct}
            selectedProduct={selectedProduct}
            setIsEditModalVisible={setIsEditModalVisible}
            refetch={refetch}
          />
          {/* <EditProductForm
            initialValues={selectedProduct}
            onSubmit={handleEditSubmit}
          /> */}
        </Modal>
      </ConfigProvider>

      {selectedProduct && (
        <ProductDetailsModal
          visible={isModalVisible}
          onClose={closeDetailsModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;

