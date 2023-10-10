import React, { useEffect, useState } from "react";
import { HtmlText } from "@e-mine/react-native-html-text";
import { ChevronDown, ExternalLink } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { openURL } from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import {
  Accordion,
  Button,
  Card,
  Circle,
  H2,
  H4,
  Image,
  ListItem,
  Separator,
  Spinner,
  Square,
  Text,
  XGroup,
  XStack,
  YStack
} from "tamagui";

import AddToCollections from "../../components/AddToCollections";
import GameBanner from "../../components/GameBanner";
import GameCarousel from "../../components/GameCarousel";
import GameCreators from "../../components/GameCreators";
import GameInfoContainer from "../../components/GameInfoContainer";
import GamePlatforms from "../../components/GamePlatforms";
import GameScreenshots from "../../components/GameScreenshots";
import GameStores from "../../components/GameStores";
import GameTags from "../../components/GameTags";
import GameTrailers from "../../components/GameTrailers";
import { MyScroll } from "../../components/MyScroll";
import RedditPostsBtn from "../../components/RedditPostsBtn";

const ESRBRating = (props) => {
  const { slug } = props;

  const ageRatingIcons = {
    mature: require("../../assets/images/ageRatingIcons/mature.png"),
    teen: require("../../assets/images/ageRatingIcons/teen.png"),
    "adults-only": require("../../assets/images/ageRatingIcons/adults.png"),
    "early-childhood": require("../../assets/images/ageRatingIcons/early-childhood.png"),
    "everyone-10-plus": require("../../assets/images/ageRatingIcons/everyone-10-plus.png"),
    "rating-pending": require("../../assets/images/ageRatingIcons/rating-pending.png"),
    everyone: require("../../assets/images/ageRatingIcons/everyone.png")
  };

  return (
    <Image
      source={ageRatingIcons[slug]}
      resizeMode="contain"
      style={{
        height: 65,
        width: 45
      }}
      position="absolute"
      zIndex={10}
      top={10}
      right={10}
    />
  );
};

const Metacritic = (props) => {
  const { metacritic, rating } = props;
  return (
    <XGroup
      bordered
      separator={<Separator vertical />}
      theme="blue"
    >
      <XGroup.Item>
        <ListItem
          flex={1}
          title={metacritic || "NA"}
          subTitle="Metascore"
        />
      </XGroup.Item>
      <XGroup.Item>
        <ListItem
          flex={1}
          title={rating || "NA"}
          subTitle="Rating"
        />
      </XGroup.Item>
    </XGroup>
  );
};

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
      theme="blue"
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

const PCRequirements = (props) => {
  const { platforms } = props;

  const pcRequirements = platforms?.find((item) => item.platform.slug === "pc")
    ?.requirements;

  if (!pcRequirements || Object.keys(pcRequirements).length === 0) return;

  const pcRequirementsMinimumArray = pcRequirements?.minimum?.split(".");
  const pcRequirementsRecommendedArray =
    pcRequirements?.recommended?.split(".");

  return (
    <Accordion
      type="multiple"
      theme="blue"
      marginTop={10}
    >
      <Accordion.Item value="pc">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
        >
          {({ open }) => (
            <>
              <Text>PC Requirements</Text>
              <Square
                animation="quick"
                rotate={open ? "180deg" : "0deg"}
              >
                <ChevronDown />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content gap={5}>
          {pcRequirementsMinimumArray?.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}

          {pcRequirementsRecommendedArray?.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

const Game = () => {
  const { id } = useLocalSearchParams();

  const [game, setGame] = useState({});
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

  return (
    <>
      <MyScroll showsVerticalScrollIndicator={false}>
        <ESRBRating {...game?.esrb_rating} />

        <GameBanner url={game?.background_image} />

        <YStack
          gap={15}
          paddingHorizontal={10}
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
              theme="blue"
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
