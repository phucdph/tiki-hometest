import React, { Component } from "react";
import { INew } from "../../../services/typings";
import { throttle, noop } from "lodash";
import NewItem from "./NewsItem";
import { Row, Col, Spin, Empty } from "antd";
import { themeVariables } from "../../../theme";
import { NewsListPlaceholder } from "./NewsPlaceholder";
interface IProps {
  data: INew[];
  isLoading?: boolean;
  isLoadingNext?: boolean;
  onReachedEnd?: () => void;
  onSaveHistory?: (req: INew) => void;
  saveHistory?: boolean;
}

class NewsList extends Component<IProps> {
  static defaultProps = {
    onReachedEnd: noop,
    isLoading: false,
    isLoadingNext: false,
    saveHistory: true
  };

  constructor(props: IProps) {
    super(props);
    window.onscroll = throttle(this.onReachedEnd, 500, {
      leading: false,
      trailing: true
    });
  }

  onReachedEnd = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 700
    ) {
      const { onReachedEnd = noop } = this.props;
      onReachedEnd();
    }
  };

  renderItem = (item: INew, index: number) => {
    const { onSaveHistory = noop, saveHistory } = this.props;
    return (
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={8}
        xl={8}
        style={{ padding: themeVariables.spacing_sm }}
        key={index}
      >
        <NewItem
          key={index}
          data={item}
          style={{ height: themeVariables.content_height, overflow: "hidden" }}
          onSaveHistory={saveHistory ? onSaveHistory : noop}
        />
      </Col>
    );
  };

  renderNoData = () => {
    return (
      <div style={{ padding: themeVariables.spacing_lg }}>
        <Empty />
      </div>
    );
  };

  render() {
    const { data = [], isLoading, isLoadingNext } = this.props;
    if (!isLoading && !data.length) return this.renderNoData();
    return (
      <>
        <Row gutter={0} style={{ padding: themeVariables.spacing_sm }}>
          {isLoading ? <NewsListPlaceholder /> : data.map(this.renderItem)}
        </Row>
        {isLoadingNext && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: themeVariables.spacing_lg,
              paddingBottom: themeVariables.spacing_lg
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </>
    );
  }
}

export default NewsList;
