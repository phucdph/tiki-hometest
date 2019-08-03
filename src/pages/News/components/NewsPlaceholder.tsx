import React from "react";
import { Card, Col } from "antd";
import { themeVariables } from "../../../theme";

interface IProps {
  style?: any;
}

const NewsPlaceholder = (props: IProps) => {
  const { style } = props;
  return (
    <Col xs={24} sm={12} md={12} lg={8} xl={8} style={{ padding: themeVariables.spacing_sm }}>
      <Card style={style} loading={true} />
    </Col>
  );
};

export default NewsPlaceholder;

export const NewsListPlaceholder = () => {
  return (
    <>
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
      <NewsPlaceholder style={{ height: themeVariables.content_height }} />
    </>
  );
};
