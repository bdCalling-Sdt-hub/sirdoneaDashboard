/* eslint-disable react/prop-types */
import { Modal, Table } from "antd";
import React from "react";

export default function OrderDetailsModal({ visible, onClose, order }) {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "Product Price",
      dataIndex: "productPrice",
      key: "productPrice",
      align: "center",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  const total = order.productList.reduce((sum, item) => sum + item.price, 0);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      style={{ borderRadius: "10px", padding: 0 }}
      bodyStyle={{ backgroundColor: "#FAEBD7", borderRadius: "10px" }}
      closeIcon={<span style={{ fontSize: "18px", color: "#000" }}>✕</span>}
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "#226622", fontWeight: "bold" }}>
          Order&apos;s Details
        </h2>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <p>
            <strong>Order ID:</strong> #{order.orderId}
          </p>
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Payment&apos;s Date:</strong> {order.date}
          </p>
          <p>
            <strong>Organization Name:</strong> {order.organizationName}
          </p>
          <p>
            <strong>Order&apos;s Status:</strong>{" "}
            <span style={{ color: "orange", fontWeight: "bold" }}>
              {order.orderStatus}
            </span>
          </p>
          <p>
            <strong>Location:</strong> {order.location}
          </p>
        </div>

        <Table
          dataSource={order.productList}
          columns={columns}
          pagination={false}
          rowKey="productName"
          style={{ marginTop: "20px", borderRadius: "8px" }}
          bordered
          summary={() => (
            <Table.Summary.Row style={{ backgroundColor: "#e1f2e6" }}>
              <Table.Summary.Cell
                colSpan={3}
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Total Price
              </Table.Summary.Cell>
              <Table.Summary.Cell
                align="center"
                style={{ fontWeight: "bold", color: "#226622" }}
              >
                ${total.toFixed(2)}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>
    </Modal>
  );
}
