import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Avatar, H2, Image, Text, View, XStack, YStack } from "tamagui";

import GameCard from "../../components/GameCard";
import LoadMoreItems from "../../components/LoadMoreItems";
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

const CreatorPositions = (props) => {
  const { positions } = props;

  return (
    <XStack
      alignItems="center"
      flexWrap="wrap"
      gap={10}
    >
      {positions?.map((item) => (
        <Text
          key={item.id}
          textTransform="capitalize"
          backgroundColor="$blue10Dark"
          paddingHorizontal={10}
          paddingVertical={5}
          borderRadius={20}
          fontSize={13}
          fontWeight="500"
        >
          {item.name}
        </Text>
      ))}
    </XStack>
  );
};

const GameListInfo = (props) => {
  const { image_background, image, games_count, name, positions, description } =
    props;

  return (
    <>
      <YStack>
        <Image
          source={{
            uri: image_background
          }}
          aspectRatio={16 / 9}
          resizeMode="cover"
        />
        <GamesCount gamesCount={games_count} />
      </YStack>

      <YStack
        marginTop={30}
        padding={10}
        gap={15}
      >
        <XStack
          alignItems="center"
          gap={15}
          flexWrap="wrap"
        >
          {image && (
            <Avatar
              circular
              size="$6"
            >
              <Avatar.Image src={image} />
              <Avatar.Fallback bc="$blue10Dark" />
            </Avatar>
          )}

          <H2 color="$blue10Dark">{name}</H2>
        </XStack>

        {positions?.length > 0 && <CreatorPositions positions={positions} />}

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

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

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
      key: process.env.EXPO_PUBLIC_API_KEY,
      page: page
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
      case "developer":
        apiParams.developers = id;
        break;
      case "creator":
        apiParams.creators = id;
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
    getGameListInfo();
  }, []);

  useEffect(() => {
    getGames();
  }, [page]);

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
      ListFooterComponent={() => (
        <LoadMoreItems
          isLoadingMore={isLoadingMore}
          onPress={loadMoreGames}
        />
      )}
    />
  );
};

export default BrowseGames;
