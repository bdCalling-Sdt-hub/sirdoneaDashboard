/* eslint-disable react/prop-types */
// ProductDetailsModal.js
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";

const ProductDetailsModal = ({ visible, onClose, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null; // If no product is selected, don't render

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const tShirtColumns = [
    {
      title: "Option",
      dataIndex: "option",
      key: "option",
      render: (text, record) => {
        // record will contain the row data, which is the product
        return (
          <div className="flex items-center gap-1">
            <p>{record.product}</p>{" "}
            {/* Access product name or any other field in the record */}
          </div>
        );
      },
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        // 'text' is the value of the column ('price'), 'record' is the entire row data
        return (
          <div>
            <p>${text}</p> {/* Use 'text' here to access the 'price' value */}
          </div>
        );
      },
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => {
        // 'text' is the value of the column ('price'), 'record' is the entire row data
        return (
          <div>
            <p>{text}</p> {/* Use 'text' here to access the 'price' value */}
          </div>
        );
      },
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "rgb(255,239,217)",
          },
        },
      }}
    >
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        width={600}
        className="bg-[#FAF8F5] rounded-lg"
      >
        <div className="p-5">
          <div className="flex items-center justify-center mb-4">
            <Button
              icon={<LeftOutlined />}
              onClick={handlePrevImage}
              className="bg-[#FFA500] text-white p-2 rounded-full"
              disabled={!product.images || product.images.length <= 1}
            />
            {product.images && product.images.length > 0 ? (
              <div className="flex">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-2/4 h-64 object-cover rounded-lg mx-2"
                />
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-2/4 h-64 object-cover rounded-lg mx-4"
                />
              </div>
            ) : (
              <div className="w-1/2 h-auto object-cover rounded-lg mx-4 text-center">
                <p>No image available</p>
              </div>
            )}
            <Button
              icon={<RightOutlined />}
              onClick={handleNextImage}
              className="bg-[#FFA500] text-white p-2 rounded-full"
              disabled={!product.images || product.images.length <= 1}
            />
          </div>
          <div className="text-start">
            <h2 className="text-xl font-semibold">
              Product: <span>{product.product}</span>
            </h2>
            {/* <div className="">
              <p className="text-xl font-bold text-[#1B7443] rounded-lg py-2 w-40 mt-2">
                Price:
              </p>
              <p className="text-lg font-bold bg-[#FEBC60] text-white rounded-lg py-2 w-1/2 text-center mt-2">
                Bag: ${product.price}
              </p>
              <p className="text-lg font-bold bg-[#FEBC60] text-white rounded-lg py-2 w-1/2 text-center mt-2">
                Loose Leaf: ${product.price}
              </p>
            </div> */}

            <div className="mt-4">
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
                  columns={tShirtColumns}
                  dataSource={[product]}
                  rowKey="productName"
                  pagination={false}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="mt-4 text-gray-600 text-sm text-start">
            <p>{product.description}</p>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={onClose}
              className="bg-[#1B7443] w-40 h-10 text-white px-8 py-2 rounded-lg"
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ProductDetailsModal;
