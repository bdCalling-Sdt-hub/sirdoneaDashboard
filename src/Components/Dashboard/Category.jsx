import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Modal,
  Popover,
  Switch,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import CategoryAdd from "../UI/Category";
import CategoryEditModal from "../UI/CategoryModal/CategoryEditModal";

const Categories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null); // Track popover visibility per record

  // Fetching product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/products.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    // Remove the item from the state
    const updatedData = data.filter((item) => item.id !== record.id);
    setData(updatedData);
    setPopoverVisible(null); // Close the popover after delete
  };

  const handleCancel = () => {
    setPopoverVisible(null); // Close the popover without making any changes
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div className="flex space-x-2">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="size-8 rounded-full"
              />
            ))
          ) : (
            <span>No images</span>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
    },
    {
      title: <span className="ml-6">Action</span>,
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Switch defaultChecked={record.status} />
          <Tooltip title="View Details">
            <Button
              icon={<TbEdit />}
              onClick={() => showDetailsModal(record)}
              className="text-2xl border-none hover:text-[#FFA500]"
            />
          </Tooltip>
          <Popover
            content={
              <div className="px-4 py-6">
                <div className="text-xl font-thin">
                  <p>Do you want to delete this</p>
                  <p className="text-center">category?</p>
                </div>
                <div className="flex justify-between mt-6 gap-3">
                  <Button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-[#DDDDDD] w-28 font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDelete(record)} // Pass the record for deletion
                    className="flex items-center space-x-2 bg-[#FF3B30] text-white no-hover w-28 font-semibold"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            }
            trigger="click"
            visible={popoverVisible === record.id} // Show popover only for the clicked record
            onVisibleChange={(visible) =>
              setPopoverVisible(visible ? record.id : null)
            } // Track popover visibility
            placement="bottomRight"
          >
            <RiDeleteBin6Line className="cursor-pointer text-lg text-[#FF3B30]" />
          </Popover>
        </div>
      ),
    },
  ];

  const handleOpenAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div className="px-2 min-h-screen">
      {/* Header */}
      <Button
        className="flex items-center h-12 text-xl mb-4 bg-[#B2DAC4] p-4 rounded-lg w-full "
        onClick={handleOpenAddModal}
      >
        <PlusOutlined />
        <p>Add Category</p>
      </Button>
      {/* Product List Table */}

      <div className=" bg-[#1b7443] p-3 rounded-t-lg">
        <h1 className="text-2xl font-bold  text-white ">Category List</h1>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "rgb(0, 0, 0, 0.5)",
                colorBgContainer: "white",
              },
            },
          }}
        >
          <div className="flex items-center justify-center gap-2"></div>
        </ConfigProvider>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "white",
              headerColor: "rgb(27,116,67)",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          loading={loading}
          rowKey="id"
          className="bg-white rounded-lg shadow-lg"
        />
      </ConfigProvider>

      {/* Add Product Modal */}
      <Modal
        open={isAddModalVisible}
        onCancel={handleCloseAddModal}
        footer={null}
        centered
        width={800}
      >
        <CategoryAdd />
      </Modal>

      {/* Product Details Modal */}
      {selectedProduct && (
        <CategoryEditModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Categories;
