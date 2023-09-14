import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { H2, Image, Text, View, YStack } from "tamagui";

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

const GameListInfo = (props) => {
  const { image_background, games_count, name, description } = props;

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
        marginTop={30}
        padding={15}
        gap={15}
      >
        <H2 color="$blue10Dark">{name}</H2>

        {description && (
          <Text>
            <HtmlText>{description}</HtmlText>
          </Text>
        )}
      </YStack>
    </>
  );
};

const BrowseGames = () => {
  const [gameListInfo, setGameListInfo] = useState({});
  const [games, setGames] = useState([]);

  const params = useLocalSearchParams();

  const { id, type } = params;

  const getGameListInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/${type}s/${id}`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGameListInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buildGameApiParams = () => {
    const apiParams = {
      key: process.env.EXPO_PUBLIC_API_KEY
    };

    switch (type) {
      case "platform":
        apiParams.platforms = id;
        break;
      case "genre":
        apiParams.genres = id;
        break;
      case "publisher":
        apiParams.publishers = id;
        break;
      case "tag":
        apiParams.tags = id;
        break;
    }

    return apiParams;
  };

  const getGames = async () => {
    const apiParams = buildGameApiParams();

    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: apiParams
      });

      setGames(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGameListInfo();
    getGames();
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
      ListHeaderComponent={() => <GameListInfo {...gameListInfo} />}
    />
  );
};

export default BrowseGames;
