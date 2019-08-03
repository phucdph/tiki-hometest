import React from "react";
import { Card } from "antd";
import { INew, ISource } from "../../../services/typings";
import { truncate, get, noop } from "lodash";
const { Meta } = Card;

interface IProps {
  style?: any;
  data: INew;
  onSaveHistory?: (req: INew) => void;
}

const NewsItem = (props: IProps) => {
  const { style, data } = props;
  const { urlToImage, description, title, author, publishedAt } =
    data || ({} as INew);
  const source = get(props, "data.source", {}) || ({} as ISource);
  const handleItemClick = React.useCallback(() => {
    const { data, onSaveHistory = noop } = props;
    window.open(data.url, "_blank");
    onSaveHistory(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const truncatedDesc = React.useMemo(
    () => truncate(description, { length: 150 }),
    [description]
  );
  const date = React.useMemo(() => new Date(publishedAt).toDateString(), [
    publishedAt
  ]);
  return (
    <Card
      hoverable
      onClick={handleItemClick}
      style={{...style, display: 'flex', flexDirection: 'column' }}
      cover={
        <img
          alt={title}
          src={urlToImage}
          style={{
            height: 300,
            objectFit: "cover"
          }}
        />
      }
    >
      <Meta title={title} description={source.name} />
      <div> {truncatedDesc}</div>

      <div style={{ fontStyle: 'italic', alignSelf: 'flex-end'}}>{author} {author ? '-' : ''} {date}</div>
    </Card>
  );
};

export default React.memo(NewsItem);
