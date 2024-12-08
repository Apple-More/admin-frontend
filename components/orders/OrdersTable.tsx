"use client";
import IconEye from "@/components/icon/icon-eye";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { getAllCustomers } from "@/services/CustomerServices";
import { getAllOrders } from "@/services/OrderServices";
import { Customer } from "@/types/CustomerType";
import { Orders } from "@/types/OrderType";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrdersTable = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [cusotmers, setCustomers] = useState<Customer[]>([]);

  const fetchAllOrders = async () => {
    try {
      const response = await getAllOrders();

      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        const orders = response.data.data.map((order: any) => ({
          customerName: order.data.customerName,
          email: order.data.email,
          created_date_time: order.created_date_time,
          sale: order.order_items.reduce(
            (total: number, item: any) => total + item.price,
            0
          ), // Sum of all item prices
          order_status: order.order_status,
          orderItems: order.order_items.map((item: any) => ({
            productName: item.product.productName,
            quantity: item.quantity,
          })),
        }));
        setRecords(orders);
      } else {
        console.error(
          "Expected an array in response.data.data but got:",
          response.data.data
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const deleteRow = (id: string) => {
    console.log("deleteRow", id);
  };

  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="Customer-table">
        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="text-lg">Orders</div>
        </div>

        <div className="datatables pagination-padding">
          <DataTable
            className="table-hover whitespace-nowrap"
            records={records}
            columns={[
              {
                accessor: "customerNumber",
                title: "No",
                textAlignment: "center",
                sortable: false,
                render: (_, index) => (
                  <div className="text-center">{index + 1}</div>
                ),
              },
              {
                accessor: "customerName",
                title: "Customer Name",
                textAlignment: "center",
                sortable: false,
                render: ({ customerName }) => (
                  <div className="font-semibold">{customerName}</div>
                ),
              },
              {
                accessor: "date",
                title: "Date",
                textAlignment: "center",
                sortable: false,
                render: ({ created_date_time }) => (
                  <div>{created_date_time?.split("T")[0]}</div>
                ),
              },
              {
                accessor: "sale",
                title: "Sale",
                textAlignment: "center",
                sortable: false,
                render: ({ sale }) => <div>${(sale / 100).toFixed(2)}</div>,
              },
              {
                accessor: "status",
                title: "Status",
                textAlignment: "center",
                sortable: false,
                render: ({ order_status }) => (
                  <div
                    className={`whitespace-nowrap ${
                      order_status === "payment_completed"
                        ? "text-success"
                        : order_status === "payment_pending"
                        ? "text-secondary"
                        : order_status === "shipped"
                        ? "text-info"
                        : order_status === "cancelled"
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {order_status
                      ? order_status.replace(/_/g, " ").toUpperCase()
                      : ""}
                  </div>
                ),
              },
              {
                accessor: "email",
                title: "Email",
                textAlignment: "center",
                sortable: false,
                render: ({ email }) => <div>{email} </div>,
              },
              {
                accessor: "orderItems",
                title: "Order Items",
                textAlignment: "center",
                sortable: false,
                render: ({ orderItems }) => (
                  <ul>
                    {orderItems.map((item: any, index: number) => (
                      <li key={index}>
                        {item.quantity} x {item.productName}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: ({ customerId }) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <Link
                      href={`/apps/Customers/preview?customerId=${customerId}`}
                      className="flex hover:text-primary"
                    >
                      <IconEye />
                    </Link>
                    <button
                      type="button"
                      className="flex hover:text-danger"
                      onClick={() => deleteRow(customerId)}
                    >
                      <IconTrashLines />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
