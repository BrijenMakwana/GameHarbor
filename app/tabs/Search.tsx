import { useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";

import GameCard from "../../components/GameCard";
import { MyStack } from "../../components/MyStack";
import SearchBar from "../../components/SearchBar";

const Search = () => {
  const [searchedGame, setSearchedGame] = useState("");
  const [games, setGames] = useState([]);

  const clearSearch = () => {
    setSearchedGame("");
    setGames([]);
  };

  const searchGames = async () => {
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
      />
    </MyStack>
  );
};

export default Search;
