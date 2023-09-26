import { useEffect, useState } from "react";
import { ListItem } from "@rneui/themed";
import { Delete } from "@tamagui/lucide-icons";
import axios from "axios";
import { Link } from "expo-router";
import { Avatar, Button, Card, H5, YStack } from "tamagui";

import { Rating, ReleasedDate } from "./GameCard";

const GameTile = (props) => {
  const { gameID } = props;

  const [game, setGame] = useState({});

  const getGame = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${gameID}`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGame(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  const removeGameFromCollection = () => {
    console.log("removed");
  };

  return (
    <ListItem.Swipeable
      rightContent={() => (
        <Button
          alignSelf="center"
          icon={Delete}
          theme="red"
          flex={1}
          onPress={removeGameFromCollection}
        >
          Remove
        </Button>
      )}
      containerStyle={{
        padding: 0,
        backgroundColor: "#111111"
      }}
    >
      <ListItem.Content>
        <Link
          href={`/game/${gameID}`}
          asChild
        >
          <Card
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={20}
            padded
            pressTheme
          >
            <Avatar
              circular
              size="$8"
            >
              <Avatar.Image src={game?.background_image} />
              <Avatar.Fallback bc="$blue10Dark" />
            </Avatar>

            <YStack
              flex={1}
              gap={10}
            >
              <H5 numberOfLines={1}>{game?.name}</H5>

              <Rating rating={game?.rating} />

              <ReleasedDate released={game?.released} />
            </YStack>
          </Card>
        </Link>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default GameTile;
