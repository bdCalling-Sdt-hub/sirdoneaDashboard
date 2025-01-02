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
import { useActiveZDeactiveStatusCategoryMutation, useDeleteCategoryMutation, useGetAllCategoryQuery } from "../../Redux/api/categoryApi";
import Swal from "sweetalert2";


const url = "http://10.0.70.35:8010/";

const Categories = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null); // Track popover visibility per record
  const {data:categoryData, isLoading, refetch} = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [activeDeactive] = useActiveZDeactiveStatusCategoryMutation();

  console.log('categoryData', categoryData?.data);
  
  const showDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async(record) => {
   console.log("deleted _id", record._id);

   try {
     //  console.log({formData});
      
         const response = await deleteCategory(record._id).unwrap();
         console.log("category response:", response);
   
         if (response.success === true) {
           
           // toast.success("OTP verified successfully!");
           Swal.fire({
             icon: "success",
             title: "Success!",
             text: "Category Deleted successfully.",
           });
   
           setPopoverVisible(null);
           refetch();
           
         }
       } catch (error) {
         console.error("Error:", error);
         if (error.data?.message) {
           // toast.error("Invalid OTP. Please try again.");
           Swal.fire({
             icon: "error",
             title: "Error!",
             text: error.data?.message,})
         } else {
           // toast.error("Failed to verify OTP. Please try again.");
           Swal.fire({
             icon: "error",
             title: "Error!",
             text: "Failed to deleted category. Please try again.",})
         }
       }
   


     // Close the popover after delete
  };

  const handleCancel = () => {
    setPopoverVisible(null); // Close the popover without making any changes
  };


const handleSwitchChange = async(checked, record) => {
  console.log("Current Value:", checked);
  console.log("Record Data:", record);
  try {
    //  console.log({formData});
     
        const response = await activeDeactive(record._id).unwrap();
        console.log("category response:", response);
  
        if (response.success === true) {
          
          // toast.success("OTP verified successfully!");
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.message,
          });
  
          refetch();
          
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.data?.message) {
          // toast.error("Invalid OTP. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.data?.message,})
        } else {
          // toast.error("Failed to verify OTP. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to deleted category. Please try again.",})
        }
      }
};

  const columns = [
    {
      title: "S. ID",
      key: "serialNumber", 
      render: (text, record, index) => `${index + 1}`, 
      responsive: ["md"], 
    },
    {
          title: "Image",
          dataIndex: "image",
          key: "image",
          render: (image) => (
            <img src={`${url}${image}`} alt="Category Image" className="size-8 rounded-full" />
          ),
        },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Active/Inactive",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
      
    },
    
    {
      title: <span className="ml-6">Action</span>,
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {/* <Switch defaultChecked={record.isActive}  onChange={(checked) => handleSwitchChange(checked, record)} /> */}
          <Switch
        checked={record.isActive} // Dynamically bind to isActive
        onChange={(checked) => handleSwitchChange(checked, record)}
      />
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
            visible={popoverVisible === record._id} // Show popover only for the clicked record
            onVisibleChange={(visible) =>
              setPopoverVisible(visible ? record._id : null)
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

    // console.log('value', values);
    
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
          dataSource={categoryData?.data}
          pagination={{ pageSize: 10 }}
          loading={isLoading}
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
        <CategoryAdd refetch={refetch} setIsAddModalVisible={setIsAddModalVisible} />
      </Modal>

      {/* Product Details Modal */}
      {selectedProduct && (
        <CategoryEditModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          product={selectedProduct}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Categories;
