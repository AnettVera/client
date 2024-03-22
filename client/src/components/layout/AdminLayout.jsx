import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';

const AdminLayout = () => {
  return (
    <>
      <header>
        <Navbar fluid rounded style={{backgroundColor:"paleturquoise"}}>
          <Navbar.Brand href="https://flowbite-react.com">
            <img src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Navbar ejemplo</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img="https://lh3.googleusercontent.com/a/ACg8ocK3W5mveMdmmsn_TkRMreA-KfqUMiVw5_tbnPf0Na-gMe2A=s432-c-no" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Leo DoCa</span>
                <span className="block truncate text-sm font-medium">Anett@gmail.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className="flex h-screen">
        <aside>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <li>
                  <Link to={"dashboard"} className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <HiChartPie className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                  <span className="px-3 flex-1 whitespace-nowrap">
                    Dashboard
                  </span>
                  </Link>
                </li>
                <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                  <Sidebar.Item href="#">Products</Sidebar.Item>
                  <Sidebar.Item href="#">Sales</Sidebar.Item>
                  <Sidebar.Item href="#">Refunds</Sidebar.Item>
                  <Sidebar.Item href="#">Shipping</Sidebar.Item>
                </Sidebar.Collapse>
                <li>
                  <Link to={"users"} className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <HiUser className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                  <span className="px-3 flex-1 whitespace-nowrap">
                    Usuarios
                  </span>
                  </Link>
                </li>
                <li>
                  <Link to={"dashboard"} className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <HiShoppingBag className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
                  <span className="px-3 flex-1 whitespace-nowrap">
                    Productos
                  </span>
                  </Link>
                </li>
                <Sidebar.Item href="#" icon={HiInbox}>
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Out
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>
        <section className="w-full">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;
