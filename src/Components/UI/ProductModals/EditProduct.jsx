/* eslint-disable react/prop-types */
// EditProductForm.js
import { PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, message, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

const { TextArea } = Input;
// const { Option } = Select;

const EditProductForm = ({ initialValues, onSubmit }) => {
  console.log(initialValues);

  // State for managing form fields
  const [productName, setProductName] = useState(
    initialValues?.product || ""
  );
  const [teaOption, setTeaOption] = useState(initialValues?.option || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [size, setSize] = useState(initialValues?.category || "");
  const [price, setPrice] = useState(initialValues?.price || "");
  const [quantity, setQuantity] = useState(initialValues?.quantity || 1);
  const [images, setImages] = useState(initialValues?.images || []);
  const [coverImage, setCoverImage] = useState(
    initialValues?.coverImage || null
  );
  const [details, setDetails] = useState(initialValues?.description || "");

  // Handle cover image change
  const handleCoverImageChange = (info) => {
    console.log(info);
    if (info.file) {
      setCoverImage(info.file.originFileObj);
      message.success("Cover image uploaded successfully");
    } else {
      message.error("Cover image upload failed");
    }
  };

  const handleImagesChange = (info) => {
    if (info && info.file) {
      if (info.file.status === "done") {
        setImages((prevImages) => [...prevImages, info.file.originFileObj]);
      } else if (info.file.status === "error") {
        message.error("Image upload failed");
      }
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // if (
    //   !productName ||
    //   !teaOption ||
    //   !price ||
    //   !quantity ||
    //   !coverImage ||
    //   !details
    // ) {
    //   message.error("Please fill all the fields.");
    //   return;
    // }

    // Prepare form data
    const formData = {
      productName,
      teaOption,
      price,
      quantity,
      images,
      coverImage,
      details,
    };

    // Call the onSave prop (or API call)
    onSubmit(formData);

    console.log(formData);

    // Reset form fields
    setProductName("");
    setTeaOption("");
    setPrice("");
    setQuantity(1);
    setImages([]);
    setCoverImage(null);
    setDetails("");

    message.success("Product saved successfully!");
  };

  return (
    <div className="p-5 bg-[#FFEFD9]">
      {/* <h1 className="font-semibold">Product</h1>
      <Input
        value={productDetails.productName}
        onChange={(e) => handleChange("productType", e.target.value)}
        className="w-full h-10 my-2"
      /> */}

      <div className="">
        <div className="mt-4">
          {/* <div className="flex gap-2">
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
                className="w-40 h-10"
                type="number"
              />
            </div>

            <div className="mt-6">
              <Button
                className="bg-[#B2DAC4] text-[#164b2d] h-10 font-semibold"
                style={{ width: "150px" }}
                onClick={handleAddColor}
              >
                Add
              </Button>
            </div>
          </div> */}

          {/* Conditional rendering based on product type */}
          {category === "Tea" && (
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

              {/* <div className="text-right">
                <Button
                  className="w-20 bg-[#1b7443] text-white h-10 text-lg text-start"
                  onClick={handleAddTea}
                >
                  Add
                </Button>
              </div> */}

              {/* {teaItems.length > 0 && (
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
              )} */}
            </div>
          )}

          {category === "T-shirt" && (
            <div className="flex flex-col gap-3 my-2">
              <div>
                <label className="font-semibold">Product</label>
                <Input
                  className="h-10"
                  placeholder="Edit product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <label className="font-semibold">Color</label>
                  <ConfigProvider>
                    <Input className="w-full h-10"></Input>
                  </ConfigProvider>
                </div>

                {/* <div>
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
                      placeholder="Edit size"
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
                </div> */}

                <div className="flex flex-col">
                  <label className="font-semibold">Quantity</label>
                  <Input
                    type="number"
                    className="h-10 placeholder:text-gray-500 w-full"
                    // placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Price</label>
                  <Input
                    // type="number"
                    className="w-full h-10"
                    placeholder="Edit price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    prefix="$"
                  />
                </div>
              </div>

              {/* <div className="text-right">
                <Button
                  className="w-20 bg-[#1b7443] text-white h-10 text-lg text-start"
                  onClick={handleAddTShirt}
                >
                  Add
                </Button>
              </div> */}

              {/* {tShirtItems.length > 0 && (
                <div className="mt-4">
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
              )} */}
            </div>
          )}

          {/* Mug and Tote - No Add Button, No Table */}
          {(category === "Mug" || category === "Tote") && (
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
        </div>
      </div>

      {/* cover image */}
      <div className=" mt-4">
        <label className="font-bold">Cover Image</label>
        {/* <Upload
          className="w-28 border border-dashed border-[#14b65a]"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => handleCoverImageChange("coverImage", info.file)}
        >
          {coverImage ? (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="cover"
              style={{ width: "100%" }}
            />
          ) : (
            <div className="">
              <UploadOutlined />
              <div>Click to upload</div>
            </div>
          )}
        </Upload> */}

        <Upload
          className="w-28 border border-dashed border-[#14b65a]"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false} // Prevent default upload
          onChange={handleCoverImageChange} // Handle file change
        >
          {coverImage ? (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="cover"
              style={{ width: "100%" }}
            />
          ) : (
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          )}
        </Upload>
      </div>
      {/* Product's Images */}
      <div className="flex flex-col mt-4">
        <label className="font-bold">Product Images</label>
        <Upload
          className="w-28 border border-dashed border-[#14b65a]"
          listType="picture-card"
          multiple
          beforeUpload={() => false}
          onChange={(info) =>
            handleImagesChange("productImages", info.fileList)
          }
        >
          <div className="">
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
          value={details}
          onChange={(e) => setDetails("details", e.target.value)}
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
