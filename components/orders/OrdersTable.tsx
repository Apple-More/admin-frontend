"use client";
import IconEye from "@/components/icon/icon-eye";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { getAllOrders } from "@/services/OrderServices";
import { Orders } from "@/types/OrderType";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrdersTable = () => {
  const [records, setRecords] = useState<Orders[]>([]);
  const [search, setSearch] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await getAllOrders();

      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        const orders = response.data.data.map((customer: any) => ({
            customerName: customer.customerName,
            email: customer.email,
            date: customer.createdAt,
            sale: customer.totalAmount,
            status: customer.order_status,
        }));
        console.log(response);
        setRecords(orders); // Set the filtered customer data
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
          {/* <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}
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
                render: ({ date }) => <div>{date?.split('T')[0]}</div>,
              },
              {
                accessor: "phoneNumber",
                title: "Status",
                textAlignment: "center",
                sortable: false,
                render: ({ status }) => {
                  return (
                    <div className={`whitespace-nowrap ${
                      status === 'payment_completed'
                      ? 'text-success'
                      :status === "payment_pending"
                      ? 'text-secondary'
                      : status === 'shipped'
                      ? 'text-info'
                      : status === 'cancelled'
                      ? 'text-danger'
                      : 'text-success'
                    }`}>
                      {status ? status.replace(/_/g, ' ').toUpperCase() : ''}
                    </div>
                  );
                },
              },
              {
                accessor: "email",
                title: "Email",
                textAlignment: "center",
                sortable: false,
                render: ({ email }) => <div>{email}</div>,
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
            // Removed getRowKey as it is not a valid property
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
