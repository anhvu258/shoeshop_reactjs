import {
    Layout,
    Drawer,
    Badge,
    FloatButton,
  } from "antd";
  import React, { useState,useEffect } from "react";
//   import AppRoutes from "../components/Routes";
  //import GeneralRouting from "../components/Routes/GeneralRouting";
  
  import MenuHeader from '../components/user/MenuHeader'
  import {
    ShoppingCartOutlined,
  
  } from "@ant-design/icons";
  import AppRoutes from '../components/Routes'
  import "../App.css";
import { getAllProducts } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, Image, Typography, Rate, message as msg } from "antd";

//   import { logout } from "../actions/auth";
//   import { clearMessage } from "../actions/message";
//   import authHeader from "../services/auth-header";
  const { Header, Content, Footer } = Layout;

const LayoutUser=()=>{
  
    return (<><Header
        style={{
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1,
            height: 68.6,
            width: "100%",
            position: "fixed",
        }}
    >
        <div
            style={{
                float: "left",
                width: 120,
                height: 31,
                fontSize: 20,
                // margin: "17px 24px 17px 0",
                // background: "rgba(0, 0, 0, 0.1)",
            }}
        >
            VHIT Store
        </div>
        <div style={{ display: "flex" }}>
            {/* <Menu
      style={{
        float: "left",
        width: "80vw",
      }}
      // theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      items={new Array(3).fill(null).map((_, index) => ({
        key: String(index + 1),
        label: `nav ${index + 1}`,
      }))}
    /> */}
            {/* //---------------------------------------------------- */}
            <MenuHeader />
            <AppCart
                style={{
                    float: "right",
                    width: "10vw",
                }} />
        </div>
    </Header>
    <Content
        className="site-layout"
        
        style={{
            paddingTop: 68.8,
            paddingLeft:50,
            paddingRight:50,
        }}
    >
            {/* <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb> */}

            <AppRoutes />
            {/* <GeneralRouting/> */}
            {/* <div style={{   background: colorBgContainer }}></div> */}
        </Content>
        
      <FloatButton.BackTop />
      <Footer
        style={{
          textAlign: "center",
          // position: "fixed",
          // left: 0,
          // bottom: 0,
          // width: "100%",
          // background:'red'
        }}
      >
        &#169; 2023 - Copyright Than Duy Hanh
      </Footer></>)
}

function AppCart() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    return (
      <div>
        <Badge
          onClick={() => {
            setCartDrawerOpen(true);
          }}
          count={7}
          className="shoppingCartOutlined"
        >
          <ShoppingCartOutlined />
        </Badge>
        <Drawer
          open={cartDrawerOpen}
          onClose={() => {
            setCartDrawerOpen(false);
          }}
          title="Your Cart"
        ></Drawer>
      </div>
    );
  }
  export default LayoutUser;