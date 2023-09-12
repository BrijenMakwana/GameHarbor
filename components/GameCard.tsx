import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { darkColors } from "@tamagui/themes";
import moment from "moment";
import { Card, Image, Text, View, XStack, YStack } from "tamagui";

const GamePlatforms = (props) => {
  const { platforms } = props;

  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case "xbox":
        return "microsoft-xbox";
      case "playstation":
        return "sony-playstation";
      case "pc":
        return "microsoft-windows";
      case "nintendo":
        return "nintendo-switch";
      case "ios":
        return "apple";
      case "android":
        return "android";
      case "mac":
        return "desktop-mac";
      case "linux":
        return "linux";
      case "web":
        return "web";
      default:
        return "file-question";
    }
  };

  if (!platforms) return;

  return (
    <XStack
      position="absolute"
      bottom={-20}
      left={20}
      paddingVertical={5}
      paddingHorizontal={10}
      gap={8}
      borderRadius={30}
      borderWidth={3}
      borderColor="$backgroundStrong"
      backgroundColor="$blue10Dark"
    >
      {platforms?.map((item) => (
        <View key={item.platform.id}>
          <MaterialCommunityIcons
            name={getPlatformIcon(item.platform.slug)}
            size={24}
            color="#000"
          />
        </View>
      ))}
    </XStack>
  );
};

const Rating = (props) => {
  const { rating } = props;

  return (
    <XStack
      alignItems="center"
      padding={5}
      gap={10}
    >
      <AntDesign
        name="star"
        size={24}
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
      flex={1}
      gap={10}
    >
      <AntDesign
        name="calendar"
        size={18}
        color={darkColors.blue10}
      />
      <Text color="$gray11Dark">{moment(released).format("ll")}</Text>
    </XStack>
  );
};

const GameCard = (props) => {
  const {
    name,
    background_image,
    fullWidth,
    parent_platforms,
    rating,
    released
  } = props;

  return (
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
        <Text fontSize={16}>{name}</Text>

        <Rating rating={rating} />

        <ReleasedDate released={released} />
      </YStack>
    </Card>
  );
};

export default GameCard;
