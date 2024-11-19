// CategoryList.js
import { useState } from "react";
import { Table, Button, Switch, Tooltip, ConfigProvider } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddCategoryModal from "../../UI/CategoryModal/AddCategory";

const MainCategory = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    {
      id: "#1",
      image: "/path/to/image.jpg",
      category: "Coffee",
      status: true,
    },
    {
      id: "#2",
      image: "/path/to/image.jpg",
      category: "Chocolate",
      status: true,
    },
    {
      id: "#3",
      image: "/path/to/image.jpg",
      category: "Ice cream",
      status: true,
    },
    {
      id: "#4",
      image: "/path/to/image.jpg",
      category: "Chips",
      status: true,
    },
    {
      id: "#5",
      image: "/path/to/image.jpg",
      category: "Cloth",
      status: true,
    },
    {
      id: "#6",
      image: "/path/to/image.jpg",
      category: "Drink",
      status: true,
    },
    {
      id: "#7",
      image: "/path/to/image.jpg",
      category: "Toys",
      status: true,
    },
    {
      id: "#8",
      image: "/path/to/image.jpg",
      category: "Shoe",
      status: true,
    },
    {
      id: "#9",
      image: "/path/to/image.jpg",
      category: "Tea",
      status: true,
    },
    {
      id: "#10",
      image: "/path/to/image.jpg",
      category: "Biscuits",
      status: true,
    },
    {
      id: "#11",
      image: "/path/to/image.jpg",
      category: "Electronics",
      status: true,
    },
    {
      id: "#12",
      image: "/path/to/image.jpg",
      category: "Medicine",
      status: true,
    },
  ]);

  const columns = [
    {
      title: "S.ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Category" className="w-8 h-8 rounded-full" />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Switch defaultChecked={record.status} />
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              className="text-black"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              shape="circle"
              className="text-red-500"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const addCategoryModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const saveCategory = () => {
    closeModal();
  };
  return (
    <div className="p-4 min-h-screen">
      <Button
        className="flex items-center h-12 text-xl mb-4 bg-[#B2DAC4] p-4 rounded-lg w-full font-semibold"
        onClick={addCategoryModal}
      >
        <PlusOutlined />
        <p>Add Category</p>
      </Button>

      {/* Category List Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-[#1b7443] p-4 text-white text-lg font-semibold rounded-t-lg">
          Category List
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
            rowKey="id"
          />
        </ConfigProvider>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        visible={isModalVisible}
        onClose={closeModal}
        onSave={saveCategory}
      />
    </div>
  );
};

export default MainCategory;
