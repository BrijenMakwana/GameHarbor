import { Dot } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { H4, Text, XStack } from "tamagui";

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
      >
        {tags?.map((item, index) => (
          <XStack
            key={item.id}
            alignItems="center"
          >
            <Text textTransform="capitalize">{item.name}</Text>

            {index < tags?.length - 1 && <Dot color={darkColors.blue10} />}
          </XStack>
        ))}
      </XStack>
    </>
  );
};

export default GameTags;
