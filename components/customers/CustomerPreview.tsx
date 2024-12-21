import React from 'react';
import IconPencilPaper from '../icon/icon-pencil-paper';
import IconCoffee from '../icon/icon-coffee';
import IconCalendar from '../icon/icon-calendar';
import IconMapPin from '../icon/icon-map-pin';
import IconMail from '../icon/icon-mail';
import IconPhone from '../icon/icon-phone';
import IconTwitter from '../icon/icon-twitter';
import IconDribbble from '../icon/icon-dribbble';
import IconGithub from '../icon/icon-github';
import Link from 'next/link';

const CustomerPreview = () => {
  const orderHistory = [
    {
      OrderId: 101,
      ProductName: 'Wireless Headphones',
      OrderDate: '2024-11-20',
      Price: '$99.99',
      Status: 'Delivered',
    },
    {
      OrderId: 102,
      ProductName: 'Smart Watch',
      OrderDate: '2024-11-15',
      Price: '$199.99',
      Status: 'Shipped',
    },
    {
      OrderId: 103,
      ProductName: 'Bluetooth Speaker',
      OrderDate: '2024-11-10',
      Price: '$49.99',
      Status: 'Processing',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile and Shipping Address Section */}
      <div className="flex gap-4">
        {/* Profile Section */}
        <div className="panel w-1/2">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
           
          </div>
          <div className="mb-5">
            <div className="flex flex-col items-center justify-center">
              <img
                src="/assets/images/profile-34.jpeg"
                alt="img"
                className="mb-5 h-24 w-24 rounded-full object-cover"
              />
              <p className="text-xl font-semibold text-primary">Jimmy Turner</p>
            </div>
            <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
              <li className="flex items-center gap-2">
                <IconCoffee className="shrink-0" /> Web Developer
              </li>
              <li className="flex items-center gap-2">
                <IconCalendar className="shrink-0" />
                Jan 20, 1989
              </li>
              <li className="flex items-center gap-2">
                <IconMapPin className="shrink-0" />
                New York, USA
              </li>
              <li>
                <button className="flex items-center gap-2">
                  <IconMail className="h-5 w-5 shrink-0" />
                  <span className="truncate text-primary">jimmy@gmail.com</span>
                </button>
              </li>
              <li className="flex items-center gap-2">
                <IconPhone />
                <span className="whitespace-nowrap" dir="ltr">
                  +1 (530) 555-12121
                </span>
              </li>
            </ul>
            <ul className="mt-7 flex items-center justify-center gap-2">
             
            </ul>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="panel w-1/2">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">Shipping Address</h5>
       
          </div>
          <div>
            <p className="text-white-dark">123 Main Street, Apt 4B</p>
            <p className="text-white-dark">New York, NY, USA</p>
            <p className="text-white-dark">ZIP: 10001</p>
          </div>
        </div>
      </div>

      {/* Order History Table */}
      <div className="panel">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-lg font-semibold dark:text-white-light">Order History</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Order ID</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Product Name</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Order Date</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Price</th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.OrderId} className="even:bg-gray-50 dark:even:bg-gray-800">
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{order.OrderId}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{order.ProductName}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{order.OrderDate}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{order.Price}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{order.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;
