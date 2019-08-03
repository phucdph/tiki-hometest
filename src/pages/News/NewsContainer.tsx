import React, { Component } from "react";
import { connect } from "react-redux";
import News from "./News";
import { getNews, getNextNews } from "./actions";
import { INewsRequest, INewsResponse, INew } from "../../services/typings";
import { newsStateSelector } from "./selectors";
import { size } from 'lodash';
import { PAGE_SIZE } from './constants';
import { saveHistoryNews } from '../History/actions';

interface IProps {
  getNews: (req: INewsRequest) => void;
  getNextNews: (req: INewsRequest) => void;
  saveHistoryNews: (req: INew) => void;
  data: INewsResponse;
  request: INewsRequest;
  action: string;
}

class NewsContainer extends Component<IProps> {
  isLoading = () => getNews.is(this.props.action);

  isLoadingNext = () => getNextNews.is(this.props.action);

  handleGetNext = () => {
    const { data, getNextNews, request } = this.props;
    const { articles, totalResults } = data;
    const length = size(articles);
    if (length >= totalResults || this.isLoading() || this.isLoadingNext()) return;
    // Free account can fetch only maximum 100 record
    if (length >= 100) return;
    getNextNews({
      ...request,
      page: (request.page || 0) + 1
    })
  }

  handleGetNews = (req: INewsRequest = {}) => {
    const { getNews } = this.props;
    getNews({
      page: 1,
      pageSize: PAGE_SIZE,
      sources: ['cnn', 'the-new-york-times'],
      ...req,
    });
  }

  render() {
    const { data, saveHistoryNews } = this.props;
    return (
      <News
        onGetNews={this.handleGetNews}
        onGetNextNews={this.handleGetNext}
        onSaveHistory={saveHistoryNews}
        data={data}
        isLoading={this.isLoading()}
        isLoadingNext={this.isLoadingNext()}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  const newsState = newsStateSelector(state);
  return {
    request: newsState.request,
    data: newsState.data,
    action: newsState.action
  };
};

const mapDispatchToProps = {
  getNews,
  getNextNews,
  saveHistoryNews,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
