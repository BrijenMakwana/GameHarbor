import { AntDesign } from "@expo/vector-icons";
import { darkColors } from "@tamagui/themes";
import { Link } from "expo-router";
import moment from "moment";
import { Card, Image, Text, XStack, YStack } from "tamagui";

import GamePlatformIcon from "./GamePlatformIcon";

const GamePlatforms = (props) => {
  const { platforms } = props;

  if (!platforms) return;

  return (
    <XStack
      position="absolute"
      bottom={-20}
      left={20}
      paddingVertical={10}
      paddingHorizontal={15}
      gap={10}
      backgroundColor="$blue3Dark"
      borderRadius={10}
    >
      {platforms?.map((item) => (
        <GamePlatformIcon
          platformName={item.platform.slug}
          key={item.platform.id}
        />
      ))}
    </XStack>
  );
};

const Rating = (props) => {
  const { rating } = props;

  return (
    <XStack
      alignItems="center"
      gap={10}
    >
      <AntDesign
        name="star"
        size={20}
        color={darkColors.yellow10}
      />

      <Text fontWeight="500">{rating || "NA"}</Text>
    </XStack>
  );
};

const ReleasedDate = (props) => {
  const { released } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="flex-end"
      gap={10}
    >
      <AntDesign
        name="calendar"
        size={16}
        color={darkColors.blue10}
      />
      <Text
        color="$gray11Dark"
        fontSize={12}
      >
        {moment(released).format("ll")}
      </Text>
    </XStack>
  );
};

const GameCard = (props) => {
  const {
    id,
    name,
    background_image,
    fullWidth,
    parent_platforms,
    rating,
    released
  } = props;

  return (
    <Link
      href={`/game/${id}`}
      asChild
    >
      <Card
        theme="blue"
        pressTheme
        marginVertical={10}
        marginHorizontal={10}
        width={!fullWidth && 270}
      >
        <Card.Header padding={0}>
          <Image
            source={{
              uri: background_image
            }}
            aspectRatio={16 / 9}
            resizeMode="contain"
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
          />

          <GamePlatforms platforms={parent_platforms} />
        </Card.Header>

        <YStack
          padding={10}
          marginTop={20}
          gap={10}
        >
          <Text
            fontSize={16}
            fontWeight="500"
          >
            {name}
          </Text>

          <Rating rating={rating} />

          <ReleasedDate released={released} />
        </YStack>
      </Card>
    </Link>
  );
};

export default GameCard;
