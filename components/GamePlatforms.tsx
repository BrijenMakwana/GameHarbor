import { H4, XStack } from "tamagui";

import GamePlatform from "./GamePlatform";

const GamePlatforms = (props) => {
  const { platforms } = props;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="#fff"
      >
        platforms
      </H4>

      <XStack
        alignItems="center"
        flexWrap="wrap"
        gap={10}
      >
        {platforms?.map((item) => (
          <GamePlatform
            key={item.platform.id}
            {...item.platform}
          />
        ))}
      </XStack>
    </>
  );
};

export default GamePlatforms;
