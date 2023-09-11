import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View, YStack } from "tamagui";

import GameCard from "../../components/GameCard";
import { formatNumber } from "../../utils/utils";

const GamesCount = (props) => {
  const { gamesCount } = props;

  return (
    <View
      backgroundColor="$blue10Dark"
      position="absolute"
      bottom={-40}
      right={40}
      width={85}
      height={85}
      alignItems="center"
      justifyContent="center"
      borderRadius={100}
      borderWidth={5}
      borderColor="$backgroundStrong"
    >
      <Text fontWeight="600">{formatNumber(gamesCount)}</Text>
      <Text
        textTransform="capitalize"
        fontWeight="600"
      >
        games
      </Text>
    </View>
  );
};

const GenreInfo = (props) => {
  const { image_background, games_count, name, description } = props.gameGenre;

  // const formatedDescription = description?.replace(/<p>|<\/p>/g, "");

  return (
    <>
      <YStack>
        <Image
          source={{
            uri: image_background
          }}
          width="100%"
          aspectRatio={16 / 9}
          resizeMode="cover"
        />
        <GamesCount gamesCount={games_count} />
      </YStack>

      <YStack
        marginTop={15}
        padding={15}
        gap={15}
      >
        <Text
          fontSize={30}
          fontWeight="600"
        >
          {name}
        </Text>

        <Text>
          <HtmlText>{description}</HtmlText>
        </Text>
      </YStack>
    </>
  );
};

const GameGenreScreen = () => {
  const [gameGenre, setGameGenre] = useState({});
  const [games, setGames] = useState([]);

  const { id } = useLocalSearchParams();

  const getGenre = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/genres/${id}`, {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      });

      setGameGenre(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenreGames = async () => {
    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          genres: id,
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
    getGenre();
    getGenreGames();
  }, []);

  return (
    <FlatList
      data={games}
      renderItem={({ item }) => (
        <GameCard
          {...item}
          fullWidth
        />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <GenreInfo gameGenre={gameGenre} />}
    />
  );
};

export default GameGenreScreen;
