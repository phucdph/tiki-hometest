import React from "react";
import { Menu } from "antd";
import "./Navbar.css";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItem } from "./constants";
import { compose } from "redux";
import { get } from "lodash";

interface IProps extends RouteComponentProps {}

const Navbar = (props: IProps) => {
  const { location, history } = props;
  const path = React.useMemo(
    () =>
      (get(props, "location.pathname", "") || "").substring(1) || MenuItem.NEWS,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location, history]
  );
  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="">logo</Link>
      </div>
      <div className="menuCon">
        <Menu mode="horizontal" selectedKeys={[path]}>
          <Menu.Item key={MenuItem.NEWS}>
            <Link to="/">News</Link>
          </Menu.Item>
          <Menu.Item key={MenuItem.HISTORY}>
            <Link to="/history">History</Link>
          </Menu.Item>
        </Menu>
      </div>
    </nav>
  );
};

const enhance = compose(withRouter);

export default enhance(Navbar as any);
