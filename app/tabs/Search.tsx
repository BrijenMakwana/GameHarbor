import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { darkColors } from "@tamagui/themes";
import axios from "axios";

import GameCard from "../../components/GameCard";
import { MyStack } from "../../components/MyStack";
import SearchBar from "../../components/SearchBar";

const Search = () => {
  const [searchedGame, setSearchedGame] = useState("");
  const [games, setGames] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const clearSearch = () => {
    setSearchedGame("");
    setGames([]);
  };

  const searchGames = async () => {
    setIsSearching(true);

    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY,
          search: searchedGame
        }
      });

      setGames(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <MyStack>
      <SearchBar
        onPress={searchGames}
        onClear={clearSearch}
        searchedGame={searchedGame}
        setSearchedGame={setSearchedGame}
      />

      <FlatList
        data={games}
        renderItem={({ item }) => (
          <GameCard
            {...item}
            fullWidth
          />
        )}
        keyExtractor={(item) => item.id}
        style={{
          marginTop: 20
        }}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            onRefresh={searchGames}
            colors={[darkColors.blue10]}
            progressBackgroundColor={darkColors.gray2}
            enabled={false}
          />
        }
      />
    </MyStack>
  );
};

export default Search;
