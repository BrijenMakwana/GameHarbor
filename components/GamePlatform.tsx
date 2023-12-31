import { Link } from "expo-router";
import { Button } from "tamagui";

import GamePlatformIcon from "./GamePlatformIcon";

const GamePlatform = (props) => {
  const { id, name, slug } = props;

  return (
    <Link
      href={{
        pathname: `/browseGames/${id}`,
        params: { type: "platform" }
      }}
      asChild
    >
      <Button
        size="$3"
        icon={<GamePlatformIcon platformName={slug} />}
        borderRadius={20}
      >
        {name}
      </Button>
    </Link>
  );
};

export default GamePlatform;
