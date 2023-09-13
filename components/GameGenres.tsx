import { useEffect, useState } from "react";
import axios from "axios";
import { H3, Separator, YGroup, YStack } from "tamagui";

import CustomListItem from "./CustomListItem";

const GameGenres = () => {
  const [gameGenres, setGameGenres] = useState([]);

  const getGenres = async () => {
    try {
      const response = await axios.get("https://api.rawg.io/api/genres", {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      });

      setGameGenres(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <YStack>
      <H3
        textTransform="capitalize"
        marginBottom={15}
        color="$blue10Dark"
      >
        genres
      </H3>
      <YGroup
        bordered
        theme="blue"
        separator={<Separator />}
      >
        {gameGenres?.map((item) => (
          <CustomListItem
            {...item}
            key={item.id}
            type="genre"
          />
        ))}
      </YGroup>
    </YStack>
  );
};

export default GameGenres;
