import { ListItem, Separator, Text, XGroup } from "tamagui";

const Metacritic = (props) => {
  const { metacritic, rating } = props;

  return (
    <XGroup separator={<Separator vertical />}>
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
          title={
            (
              <Text color={rating > 3 ? "$green10Dark" : "$red10Dark"}>
                {rating}
              </Text>
            ) || "NA"
          }
          subTitle="Rating"
        />
      </XGroup.Item>
    </XGroup>
  );
};

export default Metacritic;
