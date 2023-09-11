import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Avatar, ListItem, YGroup } from "tamagui";

import { formatNumber } from "../utils/utils";

const GenreImage = (props) => {
  const { imageUrl } = props;

  return (
    <Avatar
      circular
      size="$6"
    >
      <Avatar.Image src={imageUrl} />
      <Avatar.Fallback bc="$blue10Dark" />
    </Avatar>
  );
};

const GameGenre = (props) => {
  const { id, name, games_count, image_background } = props;

  return (
    <YGroup.Item>
      <Link
        href={`/gameGenreScreen/${id}`}
        asChild
      >
        <ListItem
          title={name}
          subTitle={`${formatNumber(games_count)} games`}
          icon={<GenreImage imageUrl={image_background} />}
          iconAfter={ChevronRight}
          pressTheme
        />
      </Link>
    </YGroup.Item>
  );
};

export default GameGenre;
