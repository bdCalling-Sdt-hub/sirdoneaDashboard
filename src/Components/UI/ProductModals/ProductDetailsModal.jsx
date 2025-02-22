import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";

const ProductDetailsModal = ({ visible, onClose, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null; 

  console.log("Product Details:", product);

  // Handle Previous Image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images?.length - 1 : prevIndex - 1
    );
  };

  // Handle Next Image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Determine columns dynamically
  const determineColumns = () => {
    if (product?.addedItems && product?.addedItems?.length > 0 && product?.addedItems[0]?.color && product?.addedItems[0]?.size) {
      return [
        {
          title: "Color",
          dataIndex: "color",
          key: "color",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (text) => <span>${text}</span>,
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Weight",
          dataIndex: "productWeight",
          key: "productWeight",
          render: (_, record) => <span>{product.productWeight ? product.productWeight : "N/A"} gm</span>,
        },
       
      ];
    } else if (product?.addedItems && product?.addedItems?.length > 0 && product?.addedItems[0]?.options) {
      return [
        {
          title: "Options",
          dataIndex: "options",
          key: "options",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (text) => <span>${text}</span>,
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Weight",
          dataIndex: "productWeight",
          key: "productWeight",
          render: (_, record) => <span>{product.productWeight ? product.productWeight : "N/A"} gm</span>,
        },
      ];
    } else {
      return [
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (text) => <span>${text}</span>,
        },
        {
          title: "Weight (gm)",
          dataIndex: "productWeight",
          key: "productWeight",
          render: (_, record) => <span>{product.productWeight ? product.productWeight : "N/A"} gm</span>,
        },
      ];
    }
  };

  const columns = determineColumns();

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
        <div className="p-2 ">
          <div className="flex items-center justify-center mb-4 ">
            <Button
              icon={<LeftOutlined />}
              onClick={handlePrevImage}
              className="bg-[#FFA500] text-white p-2 rounded-full"
              disabled={!product.images || product?.images?.length <= 1}
            />
            {product?.images && product?.images?.length > 0 ? (
              <div className="flex">
                <img
                  src={`http://139.59.0.25:8050/${product.images[currentImageIndex]}`}
                  alt={product.productName}
                  className="w-[600px] h-64 object-cover rounded-lg mx-2"
                />
              </div>
            ) : (
              <div className="w-full h-64 object-cover rounded-lg mx-4 text-center">
                <p>No image available</p>
              </div>
            )}
            <Button
              icon={<RightOutlined />}
              onClick={handleNextImage}
              className="bg-[#FFA500] text-white p-2 rounded-full"
              disabled={!product?.images || product?.images?.length <= 1}
            />
          </div>

          <div className="text-start">
            <h2 className="text-xl font-semibold">
              Product: <span>{product.productName}</span>
            </h2>

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
                  columns={columns}
                  dataSource={product?.addedItems?.length > 0 ? product?.addedItems : []}
                  rowKey="key"
                  pagination={false}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="mt-4 text-gray-600 text-sm text-start">
            <p> <span className="font-semibold"> Details: </span> {product.description}</p>
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
