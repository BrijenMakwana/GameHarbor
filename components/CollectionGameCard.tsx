import { useEffect, useState } from "react";
import { ListItem } from "@rneui/themed";
import { Delete } from "@tamagui/lucide-icons";
import axios from "axios";
import { Button } from "tamagui";

import GameCard from "./GameCard";

const CollectionGameCard = (props) => {
  const { gameID, collectionID, removeGameFromCollection } = props;

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

  return (
    <ListItem.Swipeable
      rightContent={() => (
        <Button
          alignSelf="center"
          icon={Delete}
          theme="red"
          flex={1}
          onPress={() => removeGameFromCollection(collectionID, gameID)}
        >
          Remove
        </Button>
      )}
      containerStyle={{
        padding: 0,
        backgroundColor: "#111111"
      }}
    >
      <GameCard
        {...game}
        fullWidth
      />
    </ListItem.Swipeable>
  );
};

export default CollectionGameCard;
