import React, { Component } from "react";
import { INewsRequest, INewsResponse, INew } from "../../services/typings";
import NewsList from "./components/NewsList";
import SearchBar from './components/SearchBar';
import { BackTop } from "antd";
import { debounce } from 'lodash';

interface IProps {
  onGetNews: (req?: INewsRequest) => void;
  onGetNextNews: () => void;
  onSaveHistory: (req: INew) => void;
  data: INewsResponse;
  isLoading?: boolean;
  isLoadingNext?: boolean;
}

class News extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSearch = debounce(this.handleSearch, 300, { leading: false, trailing: true });
  }

  componentDidMount() {
    const { onGetNews } = this.props;
    onGetNews();
  }

  handleSearch = (searchText: string) => {
    const { onGetNews } = this.props;
    onGetNews({ q: searchText });
  }

  render() {
    const { data, isLoading, onGetNextNews, isLoadingNext, onSaveHistory } = this.props;
    return (
      <div>
        <BackTop />
        <SearchBar onSearch={this.handleSearch}/>
        <NewsList
          data={data.articles}
          isLoading={isLoading}
          isLoadingNext={isLoadingNext}
          onReachedEnd={onGetNextNews}
          onSaveHistory={onSaveHistory}
        />
      </div>
    );
  }
}
export default News;
