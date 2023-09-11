import { ChevronRight } from "@tamagui/lucide-icons";
import { Avatar, ListItem, YGroup } from "tamagui";

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
  const { name, games_count, image_background } = props;

  return (
    <YGroup.Item>
      <ListItem
        title={name}
        subTitle={`${games_count} games`}
        icon={<GenreImage imageUrl={image_background} />}
        iconAfter={ChevronRight}
        pressTheme
      />
    </YGroup.Item>
  );
};

export default GameGenre;
