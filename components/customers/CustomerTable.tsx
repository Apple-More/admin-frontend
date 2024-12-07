"use client";
import IconEye from "@/components/icon/icon-eye";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { getAllCustomers } from "@/services/CustomerServices";
import { Customer } from "@/types/CustomerType";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerTable = () => {
  const [records, setRecords] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  const fetchAllCustomers = async () => {
    try {
      const response = await getAllCustomers();

      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        const customers = response.data.data.map((customer: any) => ({
          customerId: customer.customerId,
          customerName: customer.customerName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
        }));
        setRecords(customers); // Set the filtered customer data
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
    fetchAllCustomers();
  }, []);

  const deleteRow = (id: string) => {
    console.log("deleteRow", id);
  };

  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="Customer-table">
        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="text-lg">Customers</div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="datatables pagination-padding">
          <DataTable
            className="table-hover whitespace-nowrap"
            records={records.filter((record) =>
              record.customerName.toLowerCase().includes(search.toLowerCase())
            )}
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
                accessor: "email",
                title: "Email",
                textAlignment: "center",
                sortable: false,
                render: ({ email }) => <div>{email}</div>,
              },
              {
                accessor: "phoneNumber",
                title: "Phone Number",
                textAlignment: "center",
                sortable: false,
                render: ({ phoneNumber }) => <div>{phoneNumber}</div>,
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

export default CustomerTable;
