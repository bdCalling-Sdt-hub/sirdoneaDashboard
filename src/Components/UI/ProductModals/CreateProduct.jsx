/* eslint-disable react/prop-types */
// AddProductForm.js
import { useState } from "react";
import { Input, Select, Button, Upload, Checkbox } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const AddProductForm = ({ onSubmit }) => {
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const handleAddColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-4">
        <Select placeholder="Category" className="w-full h-10">
          <Option value="coffee">Coffee</Option>
          <Option value="tea">Tea</Option>
          <Option value="juice">Juice</Option>
        </Select>
        <Select placeholder="Sub Category" className="w-full h-10">
          <Option value="black-coffee">Black Coffee</Option>
          <Option value="hot-coffee">Hot Coffee</Option>
        </Select>
      </div>

      <div className="mt-4">
        <Input placeholder="Product Type" className="w-full h-10 mb-4" />
        <div className="flex justify-between gap-5">
          <Input
            placeholder="Product Price"
            type="number"
            className="w-56 h-10  mb-4"
          />
          <div className="flex items-center space-x-2 mb-4">
            Product Size <span className="text-gray-400">(Optional):</span>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Checkbox key={size}>{size}</Checkbox>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col mt-4">
          <label>Cover Image</label>
          <Upload className="w-full" listType="picture-card">
            <div>
              <UploadOutlined />
              <div>Click to upload</div>
            </div>
          </Upload>
        </div>

        <div className="mt-4">
          <label>Colors</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="w-1/2"
            />
            <Button
              className="bg-[#B2DAC4] text-[#1b7743]"
              onClick={handleAddColor}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color) => (
              <span key={color} className="bg-gray-200 px-2 py-1 rounded">
                {color}{" "}
                <span
                  onClick={() => handleRemoveColor(color)}
                  className="text-red-500 cursor-pointer"
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label>Product Images</label>
        <Upload className="w-full" listType="picture-card" multiple>
          <div>
            <PlusOutlined />
            <div>Click to upload</div>
          </div>
        </Upload>
      </div>

      <div className="mt-4">
        <label>Product Details</label>
        <TextArea placeholder="Enter product details..." rows={4} />
      </div>

      <Button
        className="mt-6 w-full bg-[#1b7443] text-white h-12 text-lg"
        onClick={onSubmit}
      >
        Add Product
      </Button>
    </div>
  );
};

export default AddProductForm;
