

// import React, { useState, useEffect } from "react";
// import { Button, Form, Input, Select, Upload, Table, ConfigProvider } from "antd";
// import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const CreateProductForm = ({
//   selectedProduct,
//   initialValuesProduct = {
//     product: selectedProduct?.productName,
//     type: selectedProduct?.categoryName,
//     coverImage: selectedProduct?.coverImage
//       ? [
//           {
//             uid: "-1",
//             name: "coverImage",
//             status: "done",
//             url: selectedProduct.coverImage,
//           },
//         ]
//       : [],
//     productImages: selectedProduct?.images
//       ? selectedProduct.images.map((image, index) => ({
//           uid: `-${index}`,
//           name: `image-${index}`,
//           status: "done",
//           url: image,
//         }))
//       : [],
//     addedItems: selectedProduct?.addedItems || [],
//     details: selectedProduct?.description,
//   },

// }) => {
//   const [form] = Form.useForm();
//   const [addedItems, setAddedItems] = useState(
//     initialValuesProduct?.addedItems || []
//   );
//   const [addedItems1, setAddedItems1] = useState(
//     initialValuesProduct?.addedItems || []
//   );
//   const [type, setType] = useState(initialValuesProduct?.type || "tea");

//   useEffect(() => {
//     form.setFieldsValue(initialValuesProduct);
//     setAddedItems(initialValuesProduct?.addedItems || []);
//     setType(initialValuesProduct?.type || "tea");
//   }, [initialValuesProduct, form]);

//   const handleAddItem = (values) => {
//     setAddedItems1([...addedItems1, values]);
//     form.resetFields(["options", "price", "stock"]);
//   };


//   const handleSubmit = (payload) => {
      
    
//         const updatedItems  = [...addedItems];
//         console.log("updatedItems----",updatedItems);
//       if (payload.price && payload.stock) {
//         const data = {
//           price: payload.price,
//           stock: payload.stock,
//           availableStock: payload.stock,
//         };
//         updatedItems.push(data);
//       }
    
//        // Construct finalData with updated addedItems
//       //  const formDataData = { ...payload, addedItems: updatedItems, categoryId };
//        const finalData = {
//         productName: payload.productName,
//         description: payload.description,
//         images: payload.images,
//         coverImage: payload.coverImage,
//         addedItems: updatedItems
        
//        }
//        console.log("finalData",finalData);
    
    
    
//         // console.log("Final Form payload:", finalData);
//         // Convert finalData to FormData
//         const formData = new FormData();
    
  
    
    
//       Object.keys(finalData).forEach((key) => {
//         if (key === "coverImage" || key === "images") {
//           // Ensure key exists and contains files
//           if (Array.isArray(finalData[key])) {
//             finalData[key].forEach((file) => {
//               formData.append(key, file.originFileObj);
//             });
//           }
//         } else if (Array.isArray(finalData[key]) || typeof finalData[key] === "object") {
//           // Serialize arrays and objects to JSON strings
//           formData.append(key, JSON.stringify(finalData[key]));
//         } else {
//           // Append other data directly
//           formData.append(key, finalData[key]);
//         }
//       });
    
    
    
//         console.log("FormData:", [...formData.entries()]);
    
//         // try {
//         //   const res = await addProduct(formData).unwrap();
//         //   console.log("res product", res);
    
//         //   if (res.success) {
//         //     Swal.fire({
//         //       icon: "success",
//         //       title: "Product Created Successfully!",
//         //       text: "Product created successfully.",
//         //     });
//         //   }
//         //   refetch();
//         //   setIsAddModalVisible(false);
    
//         // } catch (error) {
//         //   console.log(error);
//         //   console.error("Error:", error);
//         //   Swal.fire({
//         //     icon: "error",
//         //     title: "Error",
//         //     text: "An error occurred while creating the product.",
//         //   });
//         // }
    
    

//   };

 

//   const renderDynamicFieldsadd = () => {
//       if (type === "tea") {
//         return (
//           <div className="flex  gap-4 items-end mb-5 ">
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24">
//                   Options
//                 </span>
//               }
//               name="options"
//               className="mb-0   "
//             >
//               <Select className="w-full h-10" placeholder="Select option">
//                 <Option value="bagged">Bagged</Option>
//                 <Option value="loose">Loose</Option>
//               </Select>
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Price
//                 </span>
//               }
//               name="price"
//               className="mb-0"
//             >
//               <Input
//                 prefix="$"
//                 type="number"
//                 className="w-full h-10"
//                 placeholder="Enter price"
//               />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Quantity
//                 </span>
//               }
//               name="stock"
//               className="mb-0"
//             >
//               <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
//             </Form.Item>
  
//             <Button
//               type="primary"
//               className=" w-20 h-10"
//               onClick={() =>
//                 handleAddItem(
//                   form.getFieldsValue(["options", "price", "stock"])
//                 )
//               }
//             >
//               Add
//             </Button>
//           </div>
//         );
//       }
  
//       if (type === "tshirt") {
//         return (
//           <div className="flex  gap-4 items-end mb-5 ">
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-16 ">
//                   Color
//                 </span>
//               }
//               name="color"
//               className="mb-0"
//             >
//               <Input className="w-full h-10" placeholder="Enter color" />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24">Size</span>
//               }
//               name="size"
//               className="mb-0   "
//             >
//               <Select className="w-full h-10" placeholder="Select size">
//                 <Option value="small">Small</Option>
//                 <Option value="medium">Medium</Option>
//                 <Option value="large">Large</Option>
//                 <Option value="xl">XL</Option>
//                 <Option value="2xl">2XL</Option>
//                 <Option value="3xl">3XL</Option>
//               </Select>
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Price
//                 </span>
//               }
//               name="price"
//               className="mb-0"
//               // rules={[{ required: true, message: "Please enter a price!" }]}
//             >
//               <Input
//                 prefix="$"
//                 type="number"
//                 className="w-full h-10"
//                 placeholder="Enter price"
//               />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Quantity
//                 </span>
//               }
//               name="stock"
//               className="mb-0"
//               // rules={[{ required: true, message: "Please enter quantity!" }]}
//             >
//               <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
//             </Form.Item>
  
//             <Button
//               type="primary"
//               className=" w-20 h-10"
//               onClick={() =>
//                 handleAddItem(
//                   form.getFieldsValue(["color", "size", "price", "stock"])
//                 )
//               }
//             >
//               Add
//             </Button>
//           </div>
//           // <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
//           //   <Form.Item
//           //     label="Color"
//           //     name="color"
//           //     style={{ flex: 1 }}
//           //     rules={[{ required: true, message: "Please enter color!" }]}
//           //   >
//           //     <Input placeholder="Enter color" />
//           //   </Form.Item>
  
//           //   <Form.Item
//           //     label="Size"
//           //     name="size"
//           //     style={{ flex: 1 }}
//           //     rules={[{ required: true, message: "Please select size!" }]}
//           //   >
//           //     <Select placeholder="Select size">
//           //       <Option value="S">S</Option>
//           //       <Option value="M">M</Option>
//           //       <Option value="L">L</Option>
//           //     </Select>
//           //   </Form.Item>
  
//           //   <Form.Item
//           //     label="Quantity"
//           //     name="quantity"
//           //     style={{ flex: 1 }}
//           //     rules={[{ required: true, message: "Please enter quantity!" }]}
//           //   >
//           //     <Input placeholder="Enter quantity" />
//           //   </Form.Item>
  
//           //   <Form.Item
//           //     label="Price"
//           //     name="price"
//           //     style={{ flex: 1 }}
//           //     rules={[{ required: true, message: "Please enter a price!" }]}
//           //   >
//           //     <Input prefix="$" placeholder="Enter price" />
//           //   </Form.Item>
  
//           //   <Button
//           //     type="primary"
//           //     onClick={() =>
//           //       handleAddItem(
//           //         form.getFieldsValue(["color", "size", "quantity", "price"])
//           //       )
//           //     }
//           //   >
//           //     Add
//           //   </Button>
//           // </div>
//         );
//       }
  
//       if (type === "mug" || type === "tote") {
//         return (
//           <div className="flex gap-4 items-end mb-5">
//             <Form.Item
//             label={
//               <span className="font-semibold tracking-wide min-w-24 ">Price</span>
//             }
//             name="price"
//             rules={[{ required: true, message: "Please enter a price!" }]}
//           >
//             <Input prefix="$" type="number" className="w-full h-10" placeholder="Enter price" />
//           </Form.Item>
//             <Form.Item
//             label={
//               <span className="font-semibold tracking-wide min-w-24 ">Quantiry</span>
//             }
//             name="stock"
//             rules={[{ required: true, message: "Please enter a Quantiry!" }]}
//           >
//             <Input type="number" className="w-full h-10" placeholder="Enter price" />
//           </Form.Item>
//           </div>
          
//         );
//       }
  
//       return null;
//     };

//     const handleRemoveItem = (index) => {
//         const updatedItems = addedItems.filter((_, i) => i !== index);
//         setAddedItems(updatedItems);
//       };
    
//       const teaColumnsAdd = [
//         { title: "Option", dataIndex: "options", key: "options" },
//         { title: "Price", dataIndex: "price", key: "price" },
//         { title: "Quantity", dataIndex: "stock", key: "stock" },
//         {
//           title: "Actions",
//           key: "actions",
//           render: (_, record, index) => (
//             <Button
//               type="text"
//               danger
//               icon={<DeleteOutlined />}
//               onClick={() => handleRemoveItem(index)}
//             ></Button>
//           ),
//         },
//       ];
    
//       const tableColumnsAdd = [
//         { title: "Color", dataIndex: "color", key: "color" },
//         { title: "Size", dataIndex: "size", key: "size" },
//         { title: "Price", dataIndex: "price", key: "price" },
//         { title: "Quantity", dataIndex: "stock", key: "stock" },
//         {
//           title: "Actions",
//           key: "actions",
//           render: (_, record, index) => (
//             <Button
//               type="text"
//               danger
//               icon={<DeleteOutlined />}
//               onClick={() => handleRemoveItem(index)}
//             ></Button>
//           ),
//         },
//       ];




//   const renderDynamicFields = () => {
//       if (type === "tea") {
//         return (
//           <div className="flex  gap-4 items-end mb-5 ">
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24">
//                   Options
//                 </span>
//               }
//               name="options"
//               className="mb-0   "
//             >
//               <Select className="w-full h-10" placeholder="Select option">
//                 <Option value="bagged">Bagged</Option>
//                 <Option value="loose">Loose</Option>
//               </Select>
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Price
//                 </span>
//               }
//               name="price"
//               className="mb-0"
//             >
//               <Input
//                 prefix="$"
//                 type="number"
//                 className="w-full h-10"
//                 placeholder="Enter price"
//               />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Quantity
//                 </span>
//               }
//               name="stock"
//               className="mb-0"
//             >
//               <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
//             </Form.Item>
  
//             <Button
//               type="primary"
//               className=" w-20 h-10"
//               onClick={() =>
//                 handleAddItem(
//                   form.getFieldsValue(["options", "price", "stock"])
//                 )
//               }
//             >
//               Add
//             </Button>
//           </div>
//         );
//       }
  
//       if (type === "tshirt") {
//         return (
//           <div className="flex  gap-4 items-end mb-5 ">
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-16 ">
//                   Color
//                 </span>
//               }
//               name="color"
//               className="mb-0"
//             >
//               <Input className="w-full h-10" placeholder="Enter color" />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24">Size</span>
//               }
//               name="size"
//               className="mb-0   "
//             >
//               <Select className="w-full h-10" placeholder="Select size">
//                 <Option value="small">Small</Option>
//                 <Option value="medium">Medium</Option>
//                 <Option value="large">Large</Option>
//                 <Option value="xl">XL</Option>
//                 <Option value="2xl">2XL</Option>
//                 <Option value="3xl">3XL</Option>
//               </Select>
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Price
//                 </span>
//               }
//               name="price"
//               className="mb-0"
//               // rules={[{ required: true, message: "Please enter a price!" }]}
//             >
//               <Input
//                 prefix="$"
//                 type="number"
//                 className="w-full h-10"
//                 placeholder="Enter price"
//               />
//             </Form.Item>
  
//             <Form.Item
//               label={
//                 <span className="font-semibold tracking-wide min-w-24 ">
//                   Quantity
//                 </span>
//               }
//               name="stock"
//               className="mb-0"
//               // rules={[{ required: true, message: "Please enter quantity!" }]}
//             >
//               <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
//             </Form.Item>
  
//             <Button
//               type="primary"
//               className=" w-20 h-10"
//               onClick={() =>
//                 handleAddItem(
//                   form.getFieldsValue(["color", "size", "price", "stock"])
//                 )
//               }
//             >
//               Add
//             </Button>
//           </div>
//         );
//       }
  
//       if (type === "mug" || type === "tote") {
//         return (
//           <div className="flex gap-4 items-end mb-5">
//             <Form.Item
//             label={
//               <span className="font-semibold tracking-wide min-w-24 ">Price</span>
//             }
//             name="price"
//             // rules={[{ required: true, message: "Please enter a price!" }]}
//           >
//             <Input prefix="$" type="number" className="w-full h-10" placeholder="Enter price" />
//           </Form.Item>
//             <Form.Item
//             label={
//               <span className="font-semibold tracking-wide min-w-24 ">Quantiry</span>
//             }
//             name="stock"
//             // rules={[{ required: true, message: "Please enter a Quantiry!" }]}
//           >
//             <Input type="number" className="w-full h-10" placeholder="Enter price" />
//           </Form.Item>
//           </div>
          
//         );
//       }
  
//       return null;
//     };

//   const teaColumns = [
//     { title: "Option", dataIndex: "options", key: "options" },
//     { title: "Price", dataIndex: "price", key: "price" },
//     { title: "Stock", dataIndex: "stock", key: "stock" },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, __, index) => (
//         <Button
//           type="text"
//           danger
//           icon={<DeleteOutlined />}
//           // onClick={() => handleRemoveItem(index)}
//         />
//       ),
//     },
//   ];

//   const tableColumns = [
//       { title: "Color", dataIndex: "color", key: "color" },
//       { title: "Size", dataIndex: "size", key: "size" },
//       { title: "Price", dataIndex: "price", key: "price" },
//       { title: "Quantity", dataIndex: "stock", key: "stock" },
//       {
//         title: "Actions",
//         key: "actions",
//         render: (_, record, index) => (
//           <Button
//             type="text"
//             danger
//             icon={<DeleteOutlined />}
//             // onClick={() => handleRemoveItem(index)}
//           ></Button>
//         ),
//       },
//     ];

//   const tableColumnsMug = [
//       { title: "Price", dataIndex: "price", key: "price" },
//       { title: "Quantity", dataIndex: "stock", key: "stock" },
//       {
//         title: "Actions",
//         key: "actions",
//         render: (_, record, index) => (
//           <Button
//             type="text"
//             danger
//             icon={<DeleteOutlined />}
//             // onClick={() => handleRemoveItem(index)}
//           ></Button>
//         ),
//       },
//     ];


//   return (
//     <Form
//   form={form}
//   layout="vertical"
//   onFinish={handleSubmit}
//   initialValues={initialValuesProduct}
// >
//   <Form.Item
//     label="Type"
//     name="categoryName"
//     // Uncomment rules if required
//     // rules={[{ required: true, message: "Please select a type!" }]}
//   >
//     <Select
//       placeholder="Select type"
//       onChange={(value) => {
//         setType(value);
//         setAddedItems1([]);
//       }}
//     >
//       <Option value="tea">Tea</Option>
//       <Option value="mug">Mug</Option>
//       <Option value="tote">Tote</Option>
//       <Option value="tshirt">T-Shirt</Option>
//     </Select>
//   </Form.Item>

//   <Form.Item
//     label="Product Name"
//     name="product"
//     // Uncomment rules if required
//     // rules={[{ required: true, message: "Please enter product name!" }]}
//   >
//     <Input placeholder="Enter product name" />
//   </Form.Item>
//   <div>

//   {renderDynamicFields()}

// {addedItems.length > 0 && (
//   <>
//     {type === "tshirt" && (
//       <Table
//         columns={tableColumns}
//         dataSource={addedItems}
//         pagination={false}
//         bordered
//         rowKey={(record, index) => index}
//       />
//     )}
//     {type === "tea" && (
//       <Table
//         columns={tableColumns}
//         dataSource={addedItems}
//         pagination={false}
//         bordered
//         rowKey={(record, index) => index}
//       />
//     )}
//     {(type === "mug" || type === "tote") && (
//       <Table
//         columns={tableColumnsMug}
//         dataSource={addedItems}
//         pagination={false}
//         bordered
//         rowKey={(record, index) => index}
//       />
//     )}
//   </>
// )}
//   </div>

//   <div>
    

// {renderDynamicFieldsadd()}

// {addedItems1.length > 0 && type === "tea" && (
//   <ConfigProvider
//     theme={{
//       components: {
//         Table: {
//           cellFontSize: 14,
//           padding: 8,
//           borderColor: "#fff",
//           headerSplitColor: "#1B7443",
//         },
//       },
//     }}
//   >
//     <Table
//       columns={teaColumnsAdd}
//       dataSource={addedItems1}
//       pagination={false}
//       bordered
//       style={{ marginBottom: "20px" }}
//     />
//   </ConfigProvider>
// )}

// {addedItems1.length > 0 && type === "tshirt" && (
//   <ConfigProvider
//     theme={{
//       components: {
//         Table: {
//           cellFontSize: 14,
//           padding: 8,
//           borderColor: "#fff",
//           headerSplitColor: "#1B7443",
//         },
//       },
//     }}
//   >
//     <Table
//       columns={tableColumnsAdd}
//       dataSource={addedItems1}
//       pagination={false}
//       bordered
//       style={{ marginBottom: "20px" }}
//     />
//   </ConfigProvider>
// )}
//   </div>

  // <Form.Item
  //   label="Cover Image"
  //   name="coverImage"
  //   valuePropName="fileList"
  //   getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList || [])}
  // >
  //   <Upload
  //     listType="picture-card"
  //     maxCount={1}
  //     beforeUpload={() => false}
  //     onPreview={(file) => window.open(file.url || file.thumbUrl, "_blank")}
  //   >
  //     <div>
  //       <UploadOutlined />
  //       <div style={{ marginTop: 8 }}>Upload</div>
  //     </div>
  //   </Upload>
  // </Form.Item>

  // <Form.Item
  //   label="Product Images"
  //   name="productImages"
  //   valuePropName="fileList"
  //   getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList || [])}
  // >
  //   <Upload
  //     listType="picture-card"
  //     multiple
  //     beforeUpload={() => false}
  //     onPreview={(file) => window.open(file.url || file.thumbUrl, "_blank")}
  //   >
  //     <div>
  //       <PlusOutlined />
  //       <div style={{ marginTop: 8 }}>Upload</div>
  //     </div>
  //   </Upload>
  // </Form.Item>

  // <Form.Item
  //   label="Product Details"
  //   name="details"
  //   // Uncomment rules if required
  //   // rules={[{ required: true, message: "Please enter product details!" }]}
  // >
  //   <Input.TextArea rows={4} placeholder="Enter product details..." />
  // </Form.Item>

  // <div style={{ textAlign: "center", marginTop: 20 }}>
  //   <Button type="primary" htmlType="submit">
  //     Save
  //   </Button>
  // </div>
// </Form>



//   );
// };

// export default CreateProductForm;

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload, Table, ConfigProvider } from "antd";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEditProductHandleMutation } from "../../../Redux/api/product";
import Swal from "sweetalert2";

const { Option } = Select;

const CreateProductForm = ({
  setIsEditModalVisible,
  refetch,
  selectedProduct,
  initialValuesProduct = {
    product: selectedProduct?.productName,
    type: selectedProduct?.categoryName,
    coverImage: selectedProduct?.coverImage
      ? [
          {
            uid: "-1",
            name: "coverImage",
            status: "done",
            url: selectedProduct.coverImage,
          },
        ]
      : [],
    productImages: selectedProduct?.images
      ? selectedProduct.images.map((image, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: "done",
          url: image,
        }))
      : [],
    addedItems: selectedProduct?.addedItems || [],
    details: selectedProduct?.description,
  },
}) => {
  const [form] = Form.useForm();
  const [editProductHandler] = useEditProductHandleMutation();
  const [addedItems, setAddedItems] = useState(initialValuesProduct?.addedItems || []);
  const [addedItems1, setAddedItems1] = useState([]);
  const [type, setType] = useState(initialValuesProduct?.type || "tea");
  const [deletedImageUrls, setDeletedImageUrl] = React.useState([]);

  useEffect(() => {
    form.setFieldsValue(initialValuesProduct);
    setAddedItems(initialValuesProduct?.addedItems || []);
    setType(initialValuesProduct?.type || "tea");
  }, [initialValuesProduct, form]);

  const handleAddItem = (values) => {
    setAddedItems1([...addedItems1, values]);
    form.resetFields(["options", "price", "stock", "color", "size"]);
  };

  const handleRemoveItem = (index, isInitialTable = false) => {
    if (isInitialTable) {
      const updatedItems = addedItems.filter((_, i) => i !== index);
      setAddedItems(updatedItems);
    } else {
      const updatedItems = addedItems1.filter((_, i) => i !== index);
      setAddedItems1(updatedItems);
    }
  };

  // const handleUpdateProduct = async(payload) => {
  //   console.log('payload new edit item', payload);
  //   console.log('items --', addedItems1);
  //   const items = [...addedItems1];
  //   let newItems = [];
  //   if(items.length > 0){
  //     if(items[0].price && items[0].stock){
  //       newItems = items.map((item) => ({
  //         price: item.price,
  //         stock: item.stock,
  //         availableStock: item.stock,
  //       }));
  //     };
  //     if(items[0].price && items[0].stock && items[0].color && items[0].size){
  //       newItems = items.map((item) => ({
  //         price: item.price,
  //         stock: item.stock,
  //         availableStock: item.stock,
  //         color: item.color,
  //         size: item.size
  //       }));
  //     };
  //     if(items[0].price && items[0].stock && items[0].options ){
  //       newItems = items.map((item) => ({
  //         price: item.price,
  //         stock: item.stock,
  //         availableStock: item.stock,
  //         options: item.options
  //       }));
  //     }
  //   }



  //   const editFinalData = {
  //     productName: payload.product,
  //     description: payload.details,
  //     images: payload.productImages,
  //     coverImage: payload.coverImage,
  //     addedItems: newItems
      
  //    }

  //    if(editFinalData.addedItems.length === 0){
  //     delete editFinalData.addedItems;
  //    }
  //    console.log("editFinalData",editFinalData);
  //    console.log("editFinalData id",selectedProduct?._id);

  //    const formData = new FormData();
     
  //      Object.keys(editFinalData).forEach((key) => {
  //        if (key === "coverImage" || key === "images") {
  //          // Ensure key exists and contains files
  //          if (Array.isArray(editFinalData[key])) {
  //            editFinalData[key].forEach((file) => {
  //              formData.append(key, file.originFileObj);
  //            });
  //          }
  //        } else if (Array.isArray(editFinalData[key]) || typeof editFinalData[key] === "object") {
  //          // Serialize arrays and objects to JSON strings
  //          formData.append(key, JSON.stringify(editFinalData[key]));
  //        } else {
  //          // Append other data directly
  //          formData.append(key, editFinalData[key]);
  //        }
  //      });
     
     
     
  //       //  console.log("FormData:", [...formData.entries()]);
     
  //        try {
  //          const res = await editProductHandler(selectedProduct?._id, formData).unwrap();
  //          console.log("res update product", res);
     
  //          if (res.success) {
  //            Swal.fire({
  //              icon: "success",
  //              title: "Product Updated Successfully!",
  //              text: "Product updated successfully.",
  //            });
  //          }
  //          form.resetFields();
  //          refetch();
  //          setIsEditModalVisible(false);
     
  //        } catch (error) {
  //          console.log(error);
  //          console.error("Error:", error);
  //          Swal.fire({
  //            icon: "error",
  //            title: "Error",
  //            text: "An error occurred while creating the product.",
  //          });
  //        }





  // };

  console.log('deleted image url', deletedImageUrls);

  const handleUpdateProduct = async (payload) => {
    try {
      console.log("Payload for update:", payload);
      console.log("Items to add:", addedItems1);
  
      // Prepare newItems based on the available properties
      const newItems = addedItems1.map((item) => {
        const baseItem = {
          price: item.price,
          stock: item.stock,
          availableStock: item.stock,
        };
  
        if (item.color && item.size) {
          return { ...baseItem, color: item.color, size: item.size };
        }
  
        if (item.options) {
          return { ...baseItem, options: item.options };
        }
  
        return baseItem; // Default to base item if no additional properties exist
      });
  
      const editFinalData = {
        productName: payload.product,
        description: payload.details,
        // images: payload.productImages,
        coverImage: payload.coverImage,
        addedItems: newItems.length > 0 ? newItems : undefined, // Remove addedItems if empty
      };

      // Include only images where `status !== "done"`
      if (payload.productImages?.length > 0) {
        editFinalData.images = payload.productImages.filter((image) => image.status !== "done").map((image) => image); // Map to the file object for upload
      }
      

if (payload.coverImage?.length > 0) {
  editFinalData.coverImage = payload.coverImage
    .filter((image) => image.status !== "done") // Filter out images with status === "done"
    .map((image) => image); // Map to the file object for upload
}
  
if(deletedImageUrls && deletedImageUrls.length > 0){
  editFinalData.deletedImageUrls = deletedImageUrls;
}
      console.log("Final Data for Update:", editFinalData);
      console.log("Product ID:", selectedProduct?._id);
  
      // Prepare FormData
      const formData = new FormData();


      Object.keys(editFinalData).forEach((key) => {
        if (key === "coverImage" || key === "images") {
          // Append files or URLs for images and coverImage
          if (Array.isArray(editFinalData[key])) {
            editFinalData[key].forEach((file) => {
              if (file instanceof File || file.originFileObj) {
                formData.append(key, file.originFileObj || file); // Append file object
              } else {
                formData.append(key, file); // Append URL
              }
            });
          }
        } else if (key === "deletedImageUrls") {
          // Append deleted image URLs as JSON
          formData.append(key, JSON.stringify(editFinalData[key]));
        } else if (typeof editFinalData[key] === "object") {
          // Append other objects as JSON
          formData.append(key, JSON.stringify(editFinalData[key]));
        } else if (editFinalData[key] !== undefined) {
          // Append scalar values
          formData.append(key, editFinalData[key]);
        }
      });




      // Object.keys(editFinalData).forEach((key) => {
      //   if (key === "coverImage" || key === "images") {
      //     if (Array.isArray(editFinalData[key])) {
      //       editFinalData[key].forEach((file) => {
      //         formData.append(key, file.originFileObj);
      //       });
      //     }
      //   } else if (typeof editFinalData[key] === "object") {
      //     formData.append(key, JSON.stringify(editFinalData[key]));
      //   } else {
      //     formData.append(key, editFinalData[key]);
      //   }
      // });


      // Object.keys(editFinalData).forEach((key) => {
      //   if (key === "coverImage" || key === "images") {
      //     if (Array.isArray(editFinalData[key])) {
      //       editFinalData[key].forEach((file) => {
      //         if (file instanceof File || file.originFileObj) {
      //           formData.append(key, file.originFileObj || file); // Append file objects
      //         } else {
      //           formData.append(key, file); // Append URLs or non-file data
      //         }
      //       });
      //     }
      //   } else if (typeof editFinalData[key] === "object") {
      //     formData.append(key, JSON.stringify(editFinalData[key])); // Stringify objects
      //   } else if (editFinalData[key] !== undefined) {
      //     formData.append(key, editFinalData[key]); // Append scalar values
      //   }
      // });
  
      // // Debugging FormData
      console.log("FormData Entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }


  
      // Send the update request
      const res = await editProductHandler({id:selectedProduct?._id, formData:formData}).unwrap();
      console.log("Response from update:", res);
  
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Product Updated Successfully!",
          text: "Product updated successfully.",
        });
      }
  
      form.resetFields();
      setAddedItems1([]);
      refetch();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the product.",
      });
    }
  };
  





  const renderDynamicFields = () => {
    if (type === "tea") {
      return (
        <div className="flex gap-4 items-end mb-5">
          <Form.Item name="options" label="Options" className="mb-0">
            <Select placeholder="Select option">
              <Option value="bagged">Bagged</Option>
              <Option value="loose">Loose</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" className="mb-0">
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item name="stock" label="Quantity" className="mb-0">
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => handleAddItem(form.getFieldsValue(["options", "price", "stock"]))}
          >
            Add
          </Button>
        </div>
      );
    }

    if (type === "tshirt") {
      return (
        <div className="flex gap-4 items-end mb-5">
          <Form.Item name="color" label="Color" className="mb-0">
            <Input placeholder="Enter color" />
          </Form.Item>
          <Form.Item name="size" label="Size" className="mb-0">
            <Select placeholder="Select size">
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="xl">XL</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" className="mb-0">
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item name="stock" label="Quantity" className="mb-0">
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => handleAddItem(form.getFieldsValue(["color", "size", "price", "stock"]))}
          >
            Add
          </Button>
        </div>
      );
    }

    if (type === "mug" || type === "bag" || type === "tote") {
      return (
        <div className="flex gap-4 items-end mb-5">
          <Form.Item name="price" label="Price" className="mb-0">
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item name="stock" label="Quantity" className="mb-0">
            <Input type="number" placeholder="Enter quantity" />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => handleAddItem(form.getFieldsValue(["color", "size", "price", "stock"]))}
          >
            Add
          </Button>
        </div>
      );
    }

    return null;
  };

  const othersColumns = [
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, __, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(index, true)}
        />
      ),
    },
  ];

  const teaColumns = [
    { title: "Options", dataIndex: "options", key: "options" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, __, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(index, true)}
        />
      ),
    },
  ];

  const tableColumnsAdd = [
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, __, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(index, false)}
        />
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleUpdateProduct}
      initialValues={initialValuesProduct}
    >
      <Form.Item name="categoryName" label="Type">
        <Select
          placeholder="Select type"
          onChange={(value) => {
            setType(value);
            setAddedItems1([]);
          }}
        >
          <Option value="tea">Tea</Option>
          <Option value="tshirt">T-Shirt</Option>
        </Select>
      </Form.Item>

      <Form.Item name="product" label="Product Name">
        <Input placeholder="Enter product name" />
      </Form.Item>

      <div>
        {/* Edited Product Table */}
        {/* {renderDynamicFields()} */}

        {addedItems.length > 0 && (
          <Table
            // columns={teaColumns}
            // columns={type === "tea" ? teaColumns : type === "tshirt" ? tableColumnsAdd : othersColumns}
            columns={
              type === "tea"
                ? teaColumns.filter((col) => col.key !== "actions")
                : type === "tshirt"
                ? tableColumnsAdd.filter((col) => col.key !== "actions")
                : othersColumns.filter((col) => col.key !== "actions")
            }
            dataSource={addedItems}
            pagination={false}
            bordered
            rowKey={(record, index) => index}
          />
        )}
      </div>

      <div>
        {/* New Product Addition Table */}
        {renderDynamicFields()}

        {addedItems1.length > 0 && (
          <ConfigProvider>
            <Table
              // columns={type === "tea" ? teaColumns : type === "tshirt" ? tableColumnsAdd   : othersColumns}
              // columns={teaColumns}
              columns={type === "tea" ? teaColumns : type === "tshirt" ? tableColumnsAdd : othersColumns}
              dataSource={addedItems1}
              pagination={false}
              bordered
              style={{ marginBottom: "20px" }}
              rowKey={(record, index) => index}
            />
          </ConfigProvider>
        )}
      </div>
      <div>
      <Form.Item
    label="Cover Image"
    name="coverImage"
    valuePropName="fileList"
    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList || [])}
  >
    <Upload
      listType="picture-card"
      maxCount={1}
      beforeUpload={() => false}
      onPreview={(file) => window.open(file.url || file.thumbUrl, "_blank")}
    >
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  </Form.Item>

  <Form.Item
    label="Product Images"
    name="productImages"
    valuePropName="fileList"
    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList || [])}
  >
    <Upload
      listType="picture-card"
      multiple
      beforeUpload={() => false}
      onPreview={(file) => window.open(file.url || file.thumbUrl, "_blank")}
      onRemove={(file) => {
        // Add the removed file's URL to setDeletedImageUrl
        if (file.url) {
          setDeletedImageUrl((prev) => [...prev, file.url]);
        }
      }}
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  </Form.Item>

  <Form.Item
    label="Product Details"
    name="details"
    // Uncomment rules if required
    // rules={[{ required: true, message: "Please enter product details!" }]}
  >
    <Input.TextArea rows={4} placeholder="Enter product details..." />
  </Form.Item>

  <div style={{ textAlign: "center", marginTop: 20 }}>
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  </div>
      </div>
    </Form>
  );
};

export default CreateProductForm;

