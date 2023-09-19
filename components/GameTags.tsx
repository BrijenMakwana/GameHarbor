import { H4, XStack } from "tamagui";

import GameTag from "./GameTag";

const GameTags = (props) => {
  const { tags } = props;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="$blue10Dark"
      >
        tags
      </H4>

      <XStack
        alignItems="center"
        flexWrap="wrap"
        gap={10}
      >
        {tags?.map((item) => (
          <GameTag
            key={item.id}
            {...item}
          />
        ))}
      </XStack>
    </>
  );
};

export default GameTags;
