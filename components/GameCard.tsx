import { Card, Image, Text, YStack } from "tamagui";

const GameCard = (props) => {
  const { name, background_image, fullWidth } = props;

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
      </Card.Header>

      <YStack padding={10}>
        <Text fontSize={16}>{name}</Text>
      </YStack>
      <Card.Footer />
    </Card>
  );
};

export default GameCard;
