import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { navbar } from "../../Data/navbar";
import "./SideBar.css";
import logo from "../../logo.png";

const SideBar = ({ show, handleShow }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClick, setIsClick] = useState([]);

  const handleMouseOver = (e) => {
    // console.log(e.target.children.hasClass("closed"))
    setIsHovering(true);
    // e.target.classList.add("open")
  };

  const handleMouseOut = (e) => {
    // console.log("handleMouseOut",e)
    setIsHovering(false);
    // e.target.classList.remove("open")
  };

  const handleClick = (id) => {
    // console.log(e)
    // const clicks = isClick?.map((c) => {
    //   if (c.id === id) {
    //     c.click = !c.click;
    //   }
    //   return c;
    // });

    // setIsClick(clicks);
    console.log(isClick);
    // console.log("enter",e.target.id)
    // setIsClick(!isClick);

    // height: auto; transition-property: none;
  };

  useEffect(() => {
    setIsClick(navbar.navs?.map((n) => ({ id: n.id, click: false })));
  }, []);

  // console.log(isClick?.find(click => click.id === nav.id).click)

  return (
    <ProSidebar className={`${show ? "collapsed" : ""}`}>
      <SidebarHeader>
        <img className="sys-logo img-fluid" src={logo} />
      </SidebarHeader>
      <SidebarContent>
        <Menu>
          {navbar.navs.map((nav) =>
            nav.hasChild ? (
              <SubMenu
                id={nav.id}
                key={nav.text}
                title={nav.text}
                icon={nav.icon}
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleMouseOut(e)}
                onClick={() => handleClick(nav.id)}
                open={
                  (isHovering && show) ||
                  isClick?.find((c) => c.id === nav.id)?.click
                }
              >
                {nav.children.map((child) => (
                  <MenuItem key={child.text}>
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
