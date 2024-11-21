/* eslint-disable react/prop-types */
// EditProductForm.js
import {
  CloseOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

const EditProductForm = ({ initialValues, onSubmit }) => {
  const [colors, setColors] = useState(initialValues?.colors || []);
  const [colorInput, setColorInput] = useState("");
  const [colorPrice, setColorPrice] = useState("");
  const [productDetails, setProductDetails] = useState({
    category: initialValues.category || "",
    subCategory: initialValues.subCategory || "",
    productType: initialValues.productType || "",
    price: initialValues.price || "",
    size: initialValues.size || [],
    coverImage: initialValues.coverImage || null,
    details: initialValues.details || "",
  });

  useEffect(() => {
    if (initialValues.colors) {
      setColors(initialValues.colors);
    }
  }, [initialValues]);

  const handleAddColor = () => {
    if (colorInput && colorPrice && !colors.includes(colorInput, colorPrice)) {
      setColors([...colors, colorInput, colorPrice]);
      setColorPrice("");
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleChange = (field, value) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...productDetails, colors });
  };

  return (
    <div className="p-5 bg-[#FFEFD9]">
      {/* Category and Sub Category */}
      {/* <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Category"
          value={productDetails.category}
          onChange={(value) => handleChange("category", value)}
          className="w-full h-10"
        >
          <Option value="coffee">Coffee</Option>
          <Option value="tea">Tea</Option>
          <Option value="juice">Juice</Option>
        </Select>
        <Select
          placeholder="Sub Category"
          value={productDetails.subCategory}
          onChange={(value) => handleChange("subCategory", value)}
          className="w-full h-10"
        >
          <Option value="black-coffee">Black Coffee</Option>
          <Option value="hot-coffee">Hot Coffee</Option>
        </Select>
      </div> */}
      <h1 className="font-semibold">Product</h1>
      <Input
        placeholder="Capichino black hot coffee"
        value={productDetails.productType}
        onChange={(e) => handleChange("productType", e.target.value)}
        className="w-full h-10 my-2"
      />
      {/* Product Type and Price */}
      {/* <div className="flex gap-5 mt-2">
        <Input
          placeholder="Product Price"
          type="number"
          value={productDetails.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-56 h-10 mb-4"
        />{" "}
        <div className="flex items-center space-x-2 mb-4">
          <span>
            Product Size <span className="text-gray-400">(Optional)</span>:
          </span>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <Checkbox
              key={size}
              checked={productDetails.size.includes(size)}
              onChange={(e) => {
                const newSize = e.target.checked
                  ? [...productDetails.size, size]
                  : productDetails.size.filter((s) => s !== size);
                handleChange("size", newSize);
              }}
            >
              {size}
            </Checkbox>
          ))}
        </div>
      </div> */}

      <div className="">
        {/* Cover Image */}

        {/* Colors Section */}
        <div className="mt-4">
          <div className="grid  lg:grid-cols-3 gap-12">
            <div>
              <h1 className="font-bold">Option</h1>
              <Input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className="w-60 h-10"
              />
            </div>

            <div className="">
              <h1 className="font-bold">Price</h1>
              <Input
                value={colorPrice}
                onChange={(e) => setColorPrice(e.target.value)}
                className="w-60 h-10"
              />
            </div>

            <div className="mt-6">
              <Button
                className="bg-[#B2DAC4] text-[#1b7743] h-10"
                style={{ width: "200px" }}
                onClick={handleAddColor}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color) => (
              <div
                key={color}
                className="flex items-center bg-white px-2 py-1 rounded-lg text-sm"
              >
                {color}
                <CloseOutlined
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => handleRemoveColor(color)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* cover image */}
      <div className=" mt-4">
        <label className="font-bold">Cover Image</label>
        <Upload
          className="w-96"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => handleChange("coverImage", info.file)}
        >
          {productDetails.coverImage ? (
            <img
              src={URL.createObjectURL(productDetails.coverImage)}
              alt="cover"
              style={{ width: "100%" }}
            />
          ) : (
            <div>
              <UploadOutlined />
              <div>Click to upload</div>
            </div>
          )}
        </Upload>
      </div>
      {/* Product's Images */}
      <div className="flex flex-col mt-4">
        <label className="font-bold">Product Images</label>
        <Upload
          className="w-full"
          listType="picture-card"
          multiple
          beforeUpload={() => false}
          onChange={(info) => handleChange("productImages", info.fileList)}
        >
          <div>
            <PlusOutlined />
            <div>Click to upload</div>
          </div>
        </Upload>
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <label className="font-bold">Product Details</label>
        <TextArea
          placeholder="Enter product details..."
          rows={4}
          value={productDetails.details}
          onChange={(e) => handleChange("details", e.target.value)}
        />
      </div>

      {/* Save Button */}
      <Button
        className="mt-6 w-full bg-[#1b7443] text-white h-12 text-lg"
        onClick={handleSubmit}
      >
        <SaveOutlined /> Save Changes
      </Button>
    </div>
  );
};

export default EditProductForm;
