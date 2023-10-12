import React, { useEffect, useState } from "react";
import { HtmlText } from "@e-mine/react-native-html-text";
import { ExternalLink, Loader2 } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { openURL } from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import {
  Button,
  Card,
  Circle,
  H2,
  H4,
  Spinner,
  Square,
  Text,
  XStack,
  YStack
} from "tamagui";

import AddToCollections from "../../components/AddToCollections";
import ESRBRating from "../../components/ESRBRating";
import GameBanner from "../../components/GameBanner";
import GameCarousel from "../../components/GameCarousel";
import GameCreators from "../../components/GameCreators";
import GameInfoContainer from "../../components/GameInfoContainer";
import GamePlatforms from "../../components/GamePlatforms";
import GameScreenshots from "../../components/GameScreenshots";
import GameStores from "../../components/GameStores";
import GameTags from "../../components/GameTags";
import GameTrailers from "../../components/GameTrailers";
import Metacritic from "../../components/Metacritic";
import { MyScroll } from "../../components/MyScroll";
import PCRequirements from "../../components/PCRequirements";
import RedditPostsBtn from "../../components/RedditPostsBtn";
import { defaultImageURI } from "../../constants/constant";

const Ratings = (props) => {
  const squareColors = {
    exceptional: darkColors.green10,
    recommended: darkColors.blue10,
    meh: darkColors.orange10,
    skip: darkColors.red10
  };

  const { ratings } = props;

  if (ratings?.length === 0) return;

  return (
    <Card
      padded
      gap={15}
    >
      <XStack
        alignItems="center"
        width="100%"
      >
        {ratings?.map((item) => (
          <Square
            width={`${item.percent}%`}
            height={10}
            backgroundColor={squareColors[item.title]}
            key={item.id}
          />
        ))}
      </XStack>

      <YStack gap={10}>
        {ratings?.map((item) => (
          <XStack
            key={item.id}
            justifyContent="space-between"
          >
            <XStack
              alignItems="center"
              space={10}
            >
              <Circle
                size="$0.75"
                backgroundColor={squareColors[item.title]}
              />

              <Text textTransform="capitalize">{item.title}</Text>
            </XStack>

            <Text
              color={squareColors[item.title]}
              fontWeight="500"
            >
              {item.percent} %
            </Text>
          </XStack>
        ))}
      </YStack>
    </Card>
  );
};

const Game = () => {
  const { id } = useLocalSearchParams();

  const [game, setGame] = useState();
  const [gameIsLoading, setGameIsLoading] = useState(false);

  const getGame = async () => {
    setGameIsLoading(true);

    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      });

      setGame(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setGameIsLoading(false);
    }
  };

  const visitGameWebsite = () => {
    openURL(game?.website);
  };

  useEffect(() => {
    getGame();
  }, []);

  if (gameIsLoading)
    return (
      <Spinner
        size="large"
        color="$blue10Dark"
      />
    );

  if (!gameIsLoading && !game)
    return (
      <Button
        icon={Loader2}
        onPress={getGame}
        alignSelf="center"
        theme="blue"
      >
        Try Again
      </Button>
    );

  return (
    <>
      <MyScroll showsVerticalScrollIndicator={false}>
        <ESRBRating {...game?.esrb_rating} />

        <GameBanner url={game?.background_image || defaultImageURI} />

        <YStack
          gap={15}
          paddingHorizontal={10}
          marginTop={5}
        >
          <H2 color="#fff">{game?.name}</H2>

          {game?.released && (
            <Text>Release {moment(game?.released).fromNow()}</Text>
          )}

          <Metacritic
            metacritic={game?.metacritic}
            rating={game?.rating}
          />

          <Ratings ratings={game?.ratings} />
        </YStack>

        <YStack
          gap={15}
          marginVertical={15}
        >
          <GameScreenshots id={id} />

          <GameTrailers id={id} />
        </YStack>

        <YStack
          gap={15}
          paddingHorizontal={10}
          paddingBottom={15}
        >
          <H4
            textTransform="capitalize"
            color="#fff"
          >
            overview
          </H4>

          <Text>
            <HtmlText>{game?.description}</HtmlText>
          </Text>

          {game?.website && (
            <Button
              iconAfter={ExternalLink}
              onPress={visitGameWebsite}
              alignSelf="center"
            >
              Visit Website
            </Button>
          )}

          {game?.platforms?.length > 0 && (
            <GamePlatforms platforms={game?.platforms} />
          )}

          <PCRequirements platforms={game?.platforms} />

          {game?.tags?.length > 0 && <GameTags tags={game?.tags} />}

          {game?.genres?.length > 0 && (
            <GameInfoContainer
              data={game?.genres}
              title="genre"
              infoType="genre"
            />
          )}

          {game?.publishers?.length > 0 && (
            <GameInfoContainer
              data={game?.publishers}
              title="publisher"
              infoType="publisher"
            />
          )}

          {game?.developers?.length > 0 && (
            <GameInfoContainer
              data={game?.developers}
              title="developer"
              infoType="developer"
            />
          )}

          <GameStores id={id} />

          {game?.game_series_count > 0 && (
            <GameCarousel
              title="other games in the series"
              apiEndpoint={`https://api.rawg.io/api/games/${id}/game-series`}
            />
          )}

          <GameCreators id={id} />

          <RedditPostsBtn id={id} />
        </YStack>
      </MyScroll>

      <AddToCollections gameID={id} />
    </>
  );
};

export default Game;
