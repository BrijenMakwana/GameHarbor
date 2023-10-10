import { H4, Separator, YGroup } from "tamagui";

import CustomListItem from "./CustomListItem";

const GameInfoContainer = (props) => {
  const { title, data, infoType } = props;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="#fff"
      >
        {data?.length > 1 ? `${title}s` : title}
      </H4>

      <YGroup
        bordered
        theme="blue"
        separator={<Separator />}
      >
        {data?.map((item) => (
          <CustomListItem
            {...item}
            key={item.id}
            type={infoType}
          />
        ))}
      </YGroup>
    </>
  );
};

export default GameInfoContainer;
