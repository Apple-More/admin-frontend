"use client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "@/store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "@/store";
import { useState, useEffect } from "react";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMinus from "@/components/icon/icon-minus";
import IconMenuChat from "@/components/icon/menu/icon-menu-chat";
import IconMenuMailbox from "@/components/icon/menu/icon-menu-mailbox";
import IconMenuTodo from "@/components/icon/menu/icon-menu-todo";
import IconMenuNotes from "@/components/icon/menu/icon-menu-notes";
import IconMenuScrumboard from "@/components/icon/menu/icon-menu-scrumboard";
import IconMenuContacts from "@/components/icon/menu/icon-menu-contacts";
import IconMenuInvoice from "@/components/icon/menu/icon-menu-invoice";
import IconMenuCalendar from "@/components/icon/menu/icon-menu-calendar";
import IconMenuComponents from "@/components/icon/menu/icon-menu-components";
import IconMenuElements from "@/components/icon/menu/icon-menu-elements";
import IconMenuCharts from "@/components/icon/menu/icon-menu-charts";
import IconMenuWidgets from "@/components/icon/menu/icon-menu-widgets";
import IconMenuFontIcons from "@/components/icon/menu/icon-menu-font-icons";
import IconMenuDragAndDrop from "@/components/icon/menu/icon-menu-drag-and-drop";
import IconMenuTables from "@/components/icon/menu/icon-menu-tables";
import IconMenuDatatables from "@/components/icon/menu/icon-menu-datatables";
import IconMenuForms from "@/components/icon/menu/icon-menu-forms";
import IconMenuUsers from "@/components/icon/menu/icon-menu-users";
import IconMenuPages from "@/components/icon/menu/icon-menu-pages";
import IconMenuAuthentication from "@/components/icon/menu/icon-menu-authentication";
import IconMenuDocumentation from "@/components/icon/menu/icon-menu-documentation";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/i18n";
import IconUser from "../icon/icon-user";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import IconLogout from "../icon/icon-logout";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const handleLogout = async () => {
    // Clear authentication tokens or user session
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    await logout();
    // Redirect to the login page
    router.push("/auth/login");
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img
                className="ml-[5px] w-8 flex-none"
                src="/assets/images/logo.svg"
                alt="logo"
              />
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">
                APPLE MORE
              </span>
            </Link>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <Link href="/sales">
                  <button
                    type="button"
                    className={`${
                      currentMenu === "dashboard" ? "active" : ""
                    } nav-link group w-full`}
                  >
                    <div className="flex items-center">
                      <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                      <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                        {t("Dashboard")}
                      </span>
                    </div>
                  </button>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/orders">
                  <button
                    type="button"
                    className={`${
                      currentMenu === "orders" ? "active" : ""
                    } nav-link group w-full`}
                  >
                    <div className="flex items-center">
                      <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                      <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                        {t("Orders")}
                      </span>
                    </div>
                  </button>
                </Link>
              </li>

              <li className="menu nav-item">
                <Link href="/customers/list">
                  <button
                    type="button"
                    className={`${
                      currentMenu === "customers" ? "active" : ""
                    } nav-link group w-full`}
                  >
                    <div className="flex items-center">
                      <IconUser className="shrink-0 group-hover:!text-primary" />
                      <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                        {t("Customers")}
                      </span>
                    </div>
                  </button>
                </Link>
              </li>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "product" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("product")}
                >
                  <div className="flex items-center">
                    <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Products")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "product"
                        ? "-rotate-90 rtl:rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "product" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/apps/products/list">
                        {t("Product List")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/products/add">{t("Add Product")}</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "category" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("category")}
                >
                  <div className="flex items-center">
                    <IconMenuTables className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Category")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "category"
                        ? "-rotate-90 rtl:rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "category" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/apps/Category/list">
                        {t("Category List")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/Category/add">{t("Add Category")}</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
            </ul>
          </PerfectScrollbar>
          <div className="absolute bottom-4 w-full px-4">
            <button
              onClick={handleLogout}
              className={`${
                currentMenu === "category" ? "active" : ""
              } nav-link group w-full`}
            >
              <div className="flex items-center">
                <IconLogout className="shrink-1 group-hover:!text-primary" />
                <span className="font-bold text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                  {t("Log out")}
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
