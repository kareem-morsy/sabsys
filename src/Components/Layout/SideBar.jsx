import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaRegWindowClose, FaBars, FaGem, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { navbar } from "../../Data/navbar";
import "./SideBar.css";
import logo from "../../logo.png";

const SideBar = ({ show, handleShow }) => {
  return (
    <ProSidebar className={`${show ? "collapsed" : ""}`}>
      <SidebarHeader className="m-auto">
        <img className="sys-logo img-fluid" src={logo} />
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          {/* <MenuItem
            icon={<FaBars />}
            className={`${show ? "open" : ""}`}
            onClick={handleShow}
          ></MenuItem> */}
          {navbar.navs.map((nav) =>
            nav.hasChild ? (
              <SubMenu
                key={nav.text}
                title={nav.text}
                icon={nav.icon}
                className={`${show ? "open" : ""}`}
              >
                {nav.children.map((child) => (
                  <MenuItem
                    key={child.text}
                    className={`${show ? "keep-open" : ""}`}
                  >
                    <Link to={child.url}>{child.text}</Link>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem key={nav.text} icon={nav.icon}>
                <Link to={nav.url}>{nav.text}</Link>
              </MenuItem>
            )
          )}
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};
export default SideBar;
