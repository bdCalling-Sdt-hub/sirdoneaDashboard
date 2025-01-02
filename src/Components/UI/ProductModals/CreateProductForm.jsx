import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Table,
  ConfigProvider,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useGetAllCategoryQuery } from "../../../Redux/api/categoryApi";
import { useCreateProductMutation } from "../../../Redux/api/product";
import Swal from "sweetalert2";

const { Option } = Select;

const CreateProductForm = ({ setIsAddModalVisible }) => {
  const [form] = Form.useForm();
  const [addedItems, setAddedItems] = useState([]);
  const [type, setType] = useState("tea"); 
  const [categoryId, setCategoryId] = useState();
  const {data:allCategory, refetch} = useGetAllCategoryQuery();
  const [addProduct] = useCreateProductMutation();

  console.log("category all", allCategory?.data);

  console.log(addedItems);
  console.log({ type });
  const handleAddItem = (values) => {
    console.log('values form1', values);
    if(values.stock){
      values.availableStock = values.stock
    }
    console.log('values form2', values);
    setAddedItems([...addedItems, values]);
    form.resetFields(["options", "price", "quantity", "color", "size"]);
    console.log("setAddedItems", addedItems);
  };

  const handleSubmit = async(payload) => {
    // const finalData = { ...payload, addedItems,categoryId }; 
   

    const updatedItems  = [...addedItems];
    console.log("updatedItems----",updatedItems);
  if (payload.price && payload.stock) {
    const data = {
      price: payload.price,
      stock: payload.stock,
      availableStock: payload.stock,
    };
    updatedItems.push(data);
  }

   // Construct finalData with updated addedItems
  //  const formDataData = { ...payload, addedItems: updatedItems, categoryId };
   const finalData = {
    categoryId,
    productName: payload.productName,
    description: payload.description,
    images: payload.images,
    coverImage: payload.coverImage,
    categoryName: type,
    addedItems: updatedItems
    
   }
   console.log("finalData",finalData);



    // console.log("Final Form payload:", finalData);
    // Convert finalData to FormData
    const formData = new FormData();

    // Object.keys(finalData).forEach((key) => {
    //   if (key === "coverImage" || key === "images") {
    //     for (let file of payload[key]) {
    //       formData.append(key, file.originFileObj);
    //     }
    //   } else {
    //     formData.append(key, finalData[key]);
    //   }
    // });


  Object.keys(finalData).forEach((key) => {
    if (key === "coverImage" || key === "images") {
      // Ensure key exists and contains files
      if (Array.isArray(finalData[key])) {
        finalData[key].forEach((file) => {
          formData.append(key, file.originFileObj);
        });
      }
    } else if (Array.isArray(finalData[key]) || typeof finalData[key] === "object") {
      // Serialize arrays and objects to JSON strings
      formData.append(key, JSON.stringify(finalData[key]));
    } else {
      // Append other data directly
      formData.append(key, finalData[key]);
    }
  });



    console.log("FormData:", [...formData.entries()]);

    try {
      const res = await addProduct(formData).unwrap();
      console.log("res product", res);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Product Created Successfully!",
          text: "Product created successfully.",
        });
      }
      refetch();
      setIsAddModalVisible(false);

    } catch (error) {
      console.log(error);
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the product.",
      });
    }



  };

  const renderDynamicFields = () => {
    if (type === "tea") {
      return (
        <div className="flex  gap-4 items-end mb-5 ">
          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24">
                Options
              </span>
            }
            name="options"
            className="mb-0   "
          >
            <Select className="w-full h-10" placeholder="Select option">
              <Option value="bagged">Bagged</Option>
              <Option value="loose">Loose</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24 ">
                Price
              </span>
            }
            name="price"
            className="mb-0"
          >
            <Input
              prefix="$"
              type="number"
              className="w-full h-10"
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24 ">
                Quantity
              </span>
            }
            name="stock"
            className="mb-0"
          >
            <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
          </Form.Item>

          <Button
            type="primary"
            className=" w-20 h-10"
            onClick={() =>
              handleAddItem(
                form.getFieldsValue(["options", "price", "stock"])
              )
            }
          >
            Add
          </Button>
        </div>
      );
    }

    if (type === "tshirt") {
      return (
        <div className="flex  gap-4 items-end mb-5 ">
          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-16 ">
                Color
              </span>
            }
            name="color"
            className="mb-0"
          >
            <Input className="w-full h-10" placeholder="Enter color" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24">Size</span>
            }
            name="size"
            className="mb-0   "
          >
            <Select className="w-full h-10" placeholder="Select size">
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
              <Option value="xl">XL</Option>
              <Option value="2xl">2XL</Option>
              <Option value="3xl">3XL</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24 ">
                Price
              </span>
            }
            name="price"
            className="mb-0"
            // rules={[{ required: true, message: "Please enter a price!" }]}
          >
            <Input
              prefix="$"
              type="number"
              className="w-full h-10"
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold tracking-wide min-w-24 ">
                Quantity
              </span>
            }
            name="stock"
            className="mb-0"
            // rules={[{ required: true, message: "Please enter quantity!" }]}
          >
            <Input type="number" className="w-full h-10" placeholder="Enter quantity" />
          </Form.Item>

          <Button
            type="primary"
            className=" w-20 h-10"
            onClick={() =>
              handleAddItem(
                form.getFieldsValue(["color", "size", "price", "stock"])
              )
            }
          >
            Add
          </Button>
        </div>
        // <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        //   <Form.Item
        //     label="Color"
        //     name="color"
        //     style={{ flex: 1 }}
        //     rules={[{ required: true, message: "Please enter color!" }]}
        //   >
        //     <Input placeholder="Enter color" />
        //   </Form.Item>

        //   <Form.Item
        //     label="Size"
        //     name="size"
        //     style={{ flex: 1 }}
        //     rules={[{ required: true, message: "Please select size!" }]}
        //   >
        //     <Select placeholder="Select size">
        //       <Option value="S">S</Option>
        //       <Option value="M">M</Option>
        //       <Option value="L">L</Option>
        //     </Select>
        //   </Form.Item>

        //   <Form.Item
        //     label="Quantity"
        //     name="quantity"
        //     style={{ flex: 1 }}
        //     rules={[{ required: true, message: "Please enter quantity!" }]}
        //   >
        //     <Input placeholder="Enter quantity" />
        //   </Form.Item>

        //   <Form.Item
        //     label="Price"
        //     name="price"
        //     style={{ flex: 1 }}
        //     rules={[{ required: true, message: "Please enter a price!" }]}
        //   >
        //     <Input prefix="$" placeholder="Enter price" />
        //   </Form.Item>

        //   <Button
        //     type="primary"
        //     onClick={() =>
        //       handleAddItem(
        //         form.getFieldsValue(["color", "size", "quantity", "price"])
        //       )
        //     }
        //   >
        //     Add
        //   </Button>
        // </div>
      );
    }

    if (type === "mug" || type === "tote") {
      return (
        <div className="flex gap-4 items-end mb-5">
          <Form.Item
          label={
            <span className="font-semibold tracking-wide min-w-24 ">Price</span>
          }
          name="price"
          rules={[{ required: true, message: "Please enter a price!" }]}
        >
          <Input prefix="$" type="number" className="w-full h-10" placeholder="Enter price" />
        </Form.Item>
          <Form.Item
          label={
            <span className="font-semibold tracking-wide min-w-24 ">Quantiry</span>
          }
          name="stock"
          rules={[{ required: true, message: "Please enter a Quantiry!" }]}
        >
          <Input type="number" className="w-full h-10" placeholder="Enter price" />
        </Form.Item>
        </div>
        
      );
    }

    return null;
  };

  const handleRemoveItem = (index) => {
    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  const teaColumns = [
    { title: "Option", dataIndex: "options", key: "options" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(index)}
        ></Button>
      ),
    },
  ];

  const tableColumns = [
    { title: "Color", dataIndex: "color", key: "color" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(index)}
        ></Button>
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ type: "tea" }} // Default type set to "tea"
      autoComplete="off"
      className="bg-[#FFEFD9] p-5 rounded-lg  "
    >
      <Form.Item
        label={<span className="font-semibold tracking-wide ">Type</span>}
        name="categoryName"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        {/* <Select
          placeholder="Select type"
          className="w-full h-10"
          onChange={(value) => {
            setType(value); // Update type state
            setCategoryId(value._id)
            setAddedItems([]); // Update type state
            // form.resetFields(["options", "price", "quantity", "color", "size"]);
          }}
        >
          {
            allCategory?.data?.map((category) => (
              <Option value={category?._id, category?.name}>{category?.name}</Option>
            ))
          }
          
        </Select> */}

<Select
  placeholder="Select type"
  className="w-full h-10"
  onChange={(value, option) => {
    setCategoryId(option.label);// Set the category name
    setType(value.toLowerCase()); // Set the category _id
    setAddedItems([]); // Clear added items
    // form.resetFields(["options", "price", "quantity", "color", "size"]); // Uncomment if needed
  }}
>
  {allCategory?.data?.length > 0 ? (
    allCategory.data.map((category) => (
      <Option key={category?._id} value={category?.name} label={category?._id}  >
        {category?.name}
      </Option>
    ))
  ) : (
    <Option disabled>No categories available</Option>
  )}
</Select>

      </Form.Item>

      <Form.Item
        label={<span className="font-semibold tracking-wide ">Product</span>}
        name="productName"
        rules={[{ required: true, message: "Please enter a product name!" }]}
      >
        <Input className="w-full h-10" placeholder="Enter product name" />
      </Form.Item>

      {renderDynamicFields()}

      {addedItems.length > 0 && type === "tea" && (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellFontSize: 14,
                padding: 8,
                borderColor: "#fff",
                headerSplitColor: "#1B7443",
              },
            },
          }}
        >
          <Table
            columns={teaColumns}
            dataSource={addedItems}
            pagination={false}
            bordered
            style={{ marginBottom: "20px" }}
          />
        </ConfigProvider>
      )}

      {addedItems.length > 0 && type === "tshirt" && (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellFontSize: 14,
                padding: 8,
                borderColor: "#fff",
                headerSplitColor: "#1B7443",
              },
            },
          }}
        >
          <Table
            columns={tableColumns}
            dataSource={addedItems}
            pagination={false}
            bordered
            style={{ marginBottom: "20px" }}
          />
        </ConfigProvider>
      )}

      {/* <Form.Item
        label={<span className="font-semibold tracking-wide ">Quantity</span>}
        name="quantity"
        className="mb-0"
        rules={[{ required: true, message: "Please enter quantity!" }]}
      >
        <Input className="w-full h-10" placeholder="Enter quantity" />
      </Form.Item> */}

      <Form.Item
        label={
          <span className="font-semibold tracking-wide ">Cover Image</span>
        }
        name="coverImage"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload a cover image!" }]}
      >
        <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Click to upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        label={
          <span className="font-semibold tracking-wide ">Product Images</span>
        }
        name="images"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload listType="picture-card" multiple beforeUpload={() => false}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Click to upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        label={
          <span className="font-semibold tracking-wide min-w-24 ">
            Product Details
          </span>
        }
        name="description"
        rules={[{ required: true, message: "Please enter product details!" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter product details..." />
      </Form.Item>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#1B7443",
            borderColor: "#1B7443",
            width: "150px",
            height: "40px",
          }}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CreateProductForm;
