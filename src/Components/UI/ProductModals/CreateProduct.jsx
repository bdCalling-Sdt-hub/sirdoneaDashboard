/* eslint-disable react/prop-types */
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  message,
  Select,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const { TextArea } = Input;
const { Option } = Select;

const AddProductForm = ({ onSubmit }) => {
  const [colorInput, setColorInput] = useState("");
  const [productType, setProductType] = useState("");
  const [teaOption, setTeaOption] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");

  const [teaItems, setTeaItems] = useState([]);
  const [tShirtItems, setTShirtItems] = useState([]);
  const [mugItems, setMugItems] = useState([]);
  const [toteItems, setToteItems] = useState([]);

  useEffect(() => {
    console.log("Mug Items:", mugItems);
    console.log("Tote Items:", toteItems);
  }, [mugItems, toteItems]);

  const handleAddTea = () => {
    if (teaOption && price && quantity) {
      const teaItem = { productName, teaOption, price, quantity };
      setTeaItems([...teaItems, teaItem]);
      setProductName("");
      setTeaOption("");
      setPrice("");
      setQuantity("");
      message.success("Tea item added successfully!");
    } else {
      message.error("Please fill all fields for Tea.");
    }
  };

  const handleAddTShirt = () => {
    if (colorInput && quantity && price) {
      const tShirtItem = { productName, colorInput, price, quantity, size };
      setTShirtItems([...tShirtItems, tShirtItem]);
      setProductName("");
      setColorInput("");
      setQuantity("");
      setPrice("");
      setSize("");
      message.success("T-shirt item added successfully!");
    } else {
      message.error("Please fill all fields for T-shirt.");
    }
  };

  const handleSubmit = () => {
    if (!productName) {
      message.error("Please enter a product name.");
      return;
    }
    const productData = {
      teaItems,
      tShirtItems,
      mugItems,
      toteItems,
    };

    // Call the onSubmit function passed as prop to update the parent
    onSubmit(productData);

    console.log(productData);

    // Reset form fields
    setProductName("");
    setPrice("");
    setQuantity("");
    setProductType(null);
    setTeaOption("");
    setColorInput("");
    setTeaItems([]);
    setTShirtItems([]);
    setMugItems([]);
    setToteItems([]);
  };

  // Table columns for Tea and T-shirt
  const teaColumns = [
    // { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Option", dataIndex: "teaOption", key: "teaOption" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];

  const tShirtColumns = [
    // { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Color", dataIndex: "colorInput", key: "colorInput" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: () => (
        <button>
          <RiDeleteBin6Line className="text-[#FF3B30] ml-3" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="mb-4">
        <ConfigProvider
          theme={{
            components: {
              Select: {
                optionSelectedBg: "rgb(254,188,96)",
                optionActiveBg: "rgb(255,217,165)",
                fontSize: 14,
              },
            },
          }}
        >
          <span className="font-semibold"> Type</span>
          <Select
            placeholder="Product Type"
            className="w-full h-10"
            onChange={(value) => setProductType(value)}
            defaultValue="tea"
          >
            <Option value="tea">Tea</Option>
            <Option value="mug">Mug</Option>
            <Option value="tote">Tote</Option>
            <Option value="tShirt">T-Shirt</Option>
          </Select>
        </ConfigProvider>
      </div>

      {/* Conditional rendering based on product type */}
      {productType === "tea" && (
        <div className="flex flex-col gap-2 my-4">
          <div>
            <label className="font-semibold">Product</label>
            <Input
              className="h-10 placeholder:text-gray-500"
              placeholder="Enter tea name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="flex flex-col">
              <label className="font-semibold">Options</label>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedBg: "rgb(254,188,96)",
                      optionActiveBg: "rgb(255,217,165)",
                      fontSize: 12,
                    },
                  },
                }}
              >
                <Select
                  placeholder="Select Options"
                  className="w-56 h-10"
                  value={teaOption}
                  onChange={(value) => setTeaOption(value)}
                >
                  <Option value="bagged">Bagged</Option>
                  <Option value="loose">Loose Leaf</Option>
                </Select>
              </ConfigProvider>
            </div>
            <div>
              <label className="font-semibold">Price</label>
              <Input
                type="number"
                className="h-10 text-lg placeholder:text-gray-500"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                prefix="$"
              />
            </div>
            <div>
              <label className="font-semibold">Quantity</label>
              <Input
                type="number"
                className="h-10 text-lg placeholder:text-gray-500"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right">
            <Button
              className="w-20 bg-[#1b7443] text-white h-10 text-lg text-start"
              onClick={handleAddTea}
            >
              Add
            </Button>
          </div>

          {teaItems.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Added Tea Items</p>
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
                  dataSource={teaItems}
                  rowKey="productName"
                  pagination={false}
                />
              </ConfigProvider>
            </div>
          )}
        </div>
      )}

      {productType === "tShirt" && (
        <div className="flex flex-col gap-3 my-2">
          <div>
            <label className="font-semibold">Product</label>
            <Input
              className="h-10"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label className="font-semibold">Color</label>
              <ConfigProvider>
                <Input className="w-36 h-10"></Input>
              </ConfigProvider>
            </div>

            <div>
              <label className="font-semibold">Size</label>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedBg: "rgb(254,188,96)",
                      optionActiveBg: "rgb(255,217,165)",
                      fontSize: 12,
                    },
                  },
                }}
              >
                <Select
                  placeholder="Select size"
                  className="w-36 h-10"
                  onChange={(value) => setSize(value)}
                  value={size}
                >
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="large">Large</Option>
                  <Option value="xl">XL</Option>
                  <Option value="2xl">2XL</Option>
                  <Option value="3xl">3XL</Option>
                </Select>
              </ConfigProvider>
            </div>

            <div>
              <label className="font-semibold">Quantity</label>
              <Input
                type="number"
                className="h-10 placeholder:text-gray-500 w-20"
                // placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold">Price</label>
              <Input
                type="number"
                className="w-40 h-10"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                prefix="$"
              />
            </div>
          </div>

          <div className="text-right">
            <Button
              className="w-20 bg-[#1b7443] text-white h-10 text-lg text-start"
              onClick={handleAddTShirt}
            >
              Add
            </Button>
          </div>

          {tShirtItems.length > 0 && (
            <div className="mt-4">
              {/* <p className="font-semibold">Added T-Shirt Items</p> */}
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      cellFontSize: 14,
                      padding: 8,
                      borderColor: "#FFFFFF",
                      headerSplitColor: "#1B7443",
                    },
                  },
                }}
              >
                <Table
                  columns={tShirtColumns}
                  dataSource={tShirtItems}
                  rowKey="product"
                  pagination={false}
                />
              </ConfigProvider>
            </div>
          )}
        </div>
      )}

      {/* Mug and Tote - No Add Button, No Table */}
      {(productType === "mug" || productType === "tote") && (
        <div className="flex flex-col gap-2 my-4">
          <div>
            <label className="font-semibold">Product</label>
            <Input
              placeholder="Enter product name"
              className="h-10 placeholder:text-gray-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Price</label>
            <Input
              placeholder="Enter price"
              type="number"
              className="h-10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              prefix="$"
            />
          </div>
        </div>
      )}

      <div className="mt-2">
        <label className="font-semibold">Cover Image</label>
        <div className="flex flex-col items-center bg-gray-200 py-3 rounded-lg">
          <Upload className="" listType="picture-card">
            <div>
              <UploadOutlined />
              <div>Click to upload</div>
            </div>
          </Upload>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label className="font-semibold">Product Images</label>
        <Upload className="w-full" listType="picture-card" multiple>
          <div>
            <PlusOutlined />
            <div>Click to upload</div>
          </div>
        </Upload>
      </div>

      <div className="mt-4">
        <label className="font-semibold">Product Details</label>
        <TextArea
          className="placeholder:text-gray-500"
          placeholder="Enter product details..."
          rows={4}
        />
      </div>

      <Button
        className="mt-6 w-64 bg-[#1b7443] text-white h-12 text-lg mx-64"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default AddProductForm;
