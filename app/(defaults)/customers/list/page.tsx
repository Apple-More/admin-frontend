"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";

const CustomerList = () => {
  return (
    <>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/sales" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Customer List</span>
          </li>
        </ul>
        <div className="pt-5">
          <CustomerTable />
        </div>
      </div>
    </>
  );
};

export default CustomerList;
