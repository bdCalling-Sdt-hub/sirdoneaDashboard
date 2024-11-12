import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Input,
  Select,
  Switch,
  ConfigProvider,
  Modal,
  Popover,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddProductForm from "../UI/ProductModals/CreateProduct";
import EditProductForm from "../UI/ProductModals/EditProduct";
import ProductDetailsModal from "../UI/ProductModals/ProductDetailsModal";

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/products.json");
        console.log(response);
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
  const closeDetailsModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

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
        <img src={image} alt="Product" className="w-8 h-8 rounded-full" />
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Switch defaultChecked={record.status} />
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showDetailsModal(record)}
              className="text-lg text-[#1B7443] hover:text-[#FFA500]"
            />
          </Tooltip>
          <Popover
            content={
              <div className="flex flex-col space-y-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  className="flex items-center space-x-2"
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record)}
                  className="flex items-center space-x-2"
                >
                  Delete
                </Button>
              </div>
            }
            trigger="click"
            placement="bottomRight"
          >
            <EllipsisOutlined className="cursor-pointer text-lg" />
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

  const handleEdit = (record) => {
    setSelectedProduct(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Do you want to delete this item?",
      content: `${record.product} will be permanently deleted.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        // Perform delete action here
        console.log("Deleted record:", record);
      },
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddSubmit = () => {
    // Submit new product data
    setIsAddModalVisible(false);
  };

  const handleEditSubmit = () => {
    // Submit edited product data
    setIsEditModalVisible(false);
  };

  return (
    <div className="px-2 min-h-screen">
      {/* Header */}
      <Button
        className="flex items-center h-12 text-xl mb-4 bg-[#B2DAC4] p-4 rounded-lg w-full font-semibold"
        onClick={handleOpenAddModal}
      >
        <PlusOutlined />
        <p>Add Product</p>
      </Button>
      {/* Filters */}
      <div className="flex justify-between bg-[#1b7443] text-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Products List</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <Search
            placeholder="Search User"
            className="w-full"
            style={{ maxWidth: 300 }}
          />
          <Select
            placeholder="Sub Category"
            className="w-full"
            style={{ width: 300 }}
          >
            <Option value="black-coffee">Black Coffee</Option>
            <Option value="hot-coffee">Hot Coffee</Option>
            <Option value="cool-coffee">Cool Coffee</Option>
          </Select>
          <Select
            placeholder="Category"
            className="w-full"
            style={{ width: 300 }}
          >
            <Option value="coffee">Coffee</Option>
            <Option value="tea">Tea</Option>
            <Option value="juice">Juice</Option>
          </Select>
        </div>
      </div>
      {/* Product List Table */}
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
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(255,239,217)",
            },
            Select: {
              optionSelectedBg: "rgb(27,116,67)",
              optionSelectedColor: "rgba(255,255,255,0.88)",
            },
          },
        }}
      >
        {/* Add Product Modal */}
        <Modal
          open={isAddModalVisible}
          onCancel={handleCloseAddModal}
          footer={null}
          centered
          width={800}
        >
          <AddProductForm onSubmit={handleAddSubmit} />{" "}
          {/* AddProductForm component renders inside the modal */}
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          open={isEditModalVisible}
          onCancel={handleCloseEditModal}
          footer={null}
          centered
          width={800}
        >
          <EditProductForm
            initialValues={selectedProduct}
            onSubmit={handleEditSubmit}
          />
          {/* Pass selected record to edit */}
        </Modal>
      </ConfigProvider>{" "}
      {selectedProduct && (
        <ProductDetailsModal
          visible={isModalVisible}
          onClose={closeDetailsModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
