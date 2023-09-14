import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { H3, YStack } from "tamagui";

import GameCard from "./GameCard";

const GameCarousel = (props) => {
  const { title, apiEndpoint } = props;

  const [games, setGames] = useState([]);

  const getGames = async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      });

      setGames(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  if (games.length === 0) return;

  return (
    <YStack marginVertical={10}>
      <H3
        textTransform="capitalize"
        marginBottom={15}
        color="$blue10Dark"
      >
        {title}
      </H3>

      <FlatList
        data={games}
        renderItem={({ item }) => (
          <GameCard
            {...item}
            fullWidth={false}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </YStack>
  );
};

export default GameCarousel;
