import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { H3, YStack } from "tamagui";

import GameCard from "./GameCard";
import LoadMoreItems from "./LoadMoreItems";

const GameCarousel = (props) => {
  const { title, apiEndpoint } = props;

  const [games, setGames] = useState([]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [moreItemsAvailable, setMoreItemsAvailable] = useState(null);

  const [page, setPage] = useState(1);

  const getGames = async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY,
          page: page
        }
      });

      setMoreItemsAvailable(response.data.next);
      setGames([...games, ...response.data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadMoreGames = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getGames();
  }, [page]);

  if (games.length === 0) return;

  return (
    <YStack gap={20}>
      <H3
        textTransform="capitalize"
        color="#fff"
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
        ListFooterComponent={() =>
          moreItemsAvailable && (
            <LoadMoreItems
              isLoadingMore={isLoadingMore}
              onPress={loadMoreGames}
            />
          )
        }
        contentContainerStyle={{
          gap: 20
        }}
      />
    </YStack>
  );
};

export default GameCarousel;
