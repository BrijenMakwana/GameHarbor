import { Fragment } from "react";
import { Dot } from "@tamagui/lucide-icons";
import { H4, Text, XStack } from "tamagui";

const GameTags = (props) => {
  const { tags } = props;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="#fff"
      >
        tags
      </H4>

      <XStack
        alignItems="center"
        flexWrap="wrap"
      >
        {tags?.map((item, index) => (
          <Fragment key={item.id}>
            <Text
              textTransform="capitalize"
              color="$blue10Dark"
            >
              {item.name}
            </Text>

            {index < tags?.length - 1 && <Dot />}
          </Fragment>
        ))}
      </XStack>
    </>
  );
};

export default GameTags;
