import { Card, H2, H3, Image, Text, YStack } from "tamagui";

const GameCard = (props) => {
  const { name, background_image } = props;

  return (
    <Card
      marginRight={15}
      width={250}
    >
      <Card.Header padding={0}>
        <Image
          source={{
            uri: background_image
          }}
          aspectRatio={16 / 9}
          resizeMode="contain"
          width={250}
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
