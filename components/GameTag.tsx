import { Link } from "expo-router";
import { Button } from "tamagui";

const GameTag = (props) => {
  const { id, name } = props;

  return (
    <Link
      href={{
        pathname: `/browseGames/${id}`,
        params: { type: "tag" }
      }}
      asChild
    >
      <Button
        theme="blue"
        size="$3"
        borderRadius={20}
      >
        {name}
      </Button>
    </Link>
  );
};

export default GameTag;
