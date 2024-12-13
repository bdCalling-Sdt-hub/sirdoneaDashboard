/* eslint-disable react/prop-types */
import { Button, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

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
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log("Mug Items:", mugItems);
    console.log("Tote Items:", toteItems);
  }, [mugItems, toteItems]);

  const handleUpload = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); // Set uploaded image
      };
      reader.readAsDataURL(info.file.originFileObj);
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
    <div className="flex justify-center">
      <div className="">
        <div className="mt-2">
          <div className="flex flex-col items-center justify-center ml-4 bg-white  py-5 h-[328px] w-[564px] rounded-sm">
            <div className="relative w-[564px] h-[330px] rounded-sm  flex justify-center items-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="absolute w-full h-[338px]  object-cover rounded-sm"
                />
              ) : (
                <p className="text-[#8E8E93] w-60 mt-24 text-xl text-center">
                  Upload Image Here
                </p>
              )}
              <Upload
                className="absolute flex justify-center items-center"
                listType="picture-card"
                showUploadList={false}
                onChange={handleUpload}
              >
                {imageUrl ? null : (
                  <div className="bg-[#000000B2] text-white w-14 h-14 rounded-full flex justify-center items-center">
                    <FaPlus className="text-5xl font-bold" />
                  </div>
                )}
              </Upload>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="">Category Name</label>
          <br />
          <Input
            className="placeholder:text-gray-500 w-[584px] border border-green-600"
            placeholder="Enter category name"
            rows={4}
          />
        </div>

        <div className="text-center">
          <Button
            className="mt-6 h-12 w-80 bg-[#1b7443] text-white text-lg "
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
