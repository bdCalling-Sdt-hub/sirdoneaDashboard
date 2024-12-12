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

const CategoryAdd = ({ onSubmit }) => {
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
    if (productName && teaOption && price && quantity) {
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
    if (productName && colorInput && quantity && price) {
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
    // Prepare product data to send to parent component
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

 

  return (
    <div className="p-5 addProducts">
   

  

      <div className="mt-2">
        <div className="flex flex-col items-center bg-white py-5">
          <Upload className="" listType="picture-card">
            <div>
              <UploadOutlined />
              <div>Click to upload</div>
            </div>
          </Upload>
        </div>
      </div>

    

      <div className="mt-4">
        <label className="font-semibold">Product Details</label>
        <Input
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

export default CategoryAdd;
