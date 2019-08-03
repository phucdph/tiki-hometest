import React, { Component } from "react";
import { Input } from "antd";
import { themeVariables } from "../../../theme";
import { noop } from 'lodash';

const { Search } = Input;

interface IProps {
  onSearch: (searchText: string) => void;
}

class SearchBar extends Component<IProps> {
  static defaultProps = {
    onSearch: noop,
  }

  onChangeText = (e: any) => {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div
        style={{
          paddingTop: themeVariables.spacing_md,
          paddingLeft: themeVariables.spacing_md,
          paddingRight: themeVariables.spacing_md
        }}
      >
        <Search placeholder="Search" onChange={this.onChangeText}/>
      </div>
    );
  }
}

export default SearchBar;
