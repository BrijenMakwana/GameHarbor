import { ListItem, Separator, XGroup } from "tamagui";

const Metacritic = (props) => {
  const { metacritic, rating } = props;

  return (
    <XGroup
      bordered
      separator={<Separator vertical />}
      theme="blue"
    >
      <XGroup.Item>
        <ListItem
          flex={1}
          title={metacritic || "NA"}
          subTitle="Metascore"
        />
      </XGroup.Item>
      <XGroup.Item>
        <ListItem
          flex={1}
          title={rating || "NA"}
          subTitle="Rating"
        />
      </XGroup.Item>
    </XGroup>
  );
};

export default Metacritic;
