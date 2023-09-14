import React, { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import { ChevronDown } from "@tamagui/lucide-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import {
  Accordion,
  Avatar,
  H2,
  H4,
  Image,
  Separator,
  Square,
  Text,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import CustomListItem from "../../components/CustomListItem";
import GameCarousel from "../../components/GameCarousel";
import GamePlatform from "../../components/GamePlatform";
import GameTag from "../../components/GameTag";
import { MyScroll } from "../../components/MyScroll";

const GameBanner = (props) => {
  const { bannerImage, avatarImage } = props;
  return (
    <YStack>
      <Image
        source={{
          uri: bannerImage
        }}
        aspectRatio={16 / 9}
        resizeMode="cover"
      />

      <Avatar
        circular
        size="$11"
        position="absolute"
        bottom={-60}
        left={30}
        borderWidth={7}
        borderColor="$backgroundStrong"
      >
        <Avatar.Image src={avatarImage} />
        <Avatar.Fallback bc="$blue10Dark" />
      </Avatar>
    </YStack>
  );
};

const GameScreenshots = (props) => {
  const { id } = props;

  const [gameScreenshots, setGameScreenshots] = useState([]);

  const getGameScreenshots = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/screenshots`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGameScreenshots(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGameScreenshots();
  }, []);

  return (
    <YStack space={15}>
      <H4
        textTransform="capitalize"
        color="$blue10Dark"
      >
        take a look
      </H4>
      <FlatList
        data={gameScreenshots}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item.image
            }}
            aspectRatio={16 / 9}
            resizeMode="cover"
            width={Dimensions.get("window").width}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").width}
      />
    </YStack>
  );
};

const PCRequirements = (props) => {
  const { platforms } = props;

  const pcRequirements = platforms?.find((item) => item.platform.slug === "pc")
    .requirements;

  if (!pcRequirements) return;

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

  const getGame = async () => {
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
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <MyScroll showsVerticalScrollIndicator={false}>
      <GameBanner
        avatarImage={game?.background_image}
        bannerImage={game?.background_image_additional}
      />

      <YStack
        padding={10}
        space={15}
        marginTop={60}
      >
        <H2 color="$blue10Dark">{game?.name}</H2>

        <GameScreenshots id={id} />

        <H4
          textTransform="capitalize"
          color="$blue10Dark"
        >
          overview
        </H4>

        <Text fontSize={15}>
          <HtmlText>{game?.description}</HtmlText>
        </Text>

        <H4
          textTransform="capitalize"
          color="$blue10Dark"
        >
          platforms
        </H4>

        <XStack
          alignItems="center"
          flexWrap="wrap"
          gap={10}
        >
          {game?.platforms?.map((item) => (
            <GamePlatform
              key={item.platform.id}
              {...item.platform}
            />
          ))}
        </XStack>

        <PCRequirements platforms={game?.platforms} />

        <H4
          textTransform="capitalize"
          color="$blue10Dark"
        >
          tags
        </H4>

        <XStack
          alignItems="center"
          flexWrap="wrap"
          gap={10}
        >
          {game?.tags?.map((item) => (
            <GameTag
              key={item.id}
              {...item}
            />
          ))}
        </XStack>

        <H4
          textTransform="capitalize"
          color="$blue10Dark"
        >
          genres
        </H4>

        <YGroup
          bordered
          theme="blue"
          separator={<Separator />}
        >
          {game?.genres?.map((item) => (
            <CustomListItem
              {...item}
              key={item.id}
              type="genre"
            />
          ))}
        </YGroup>

        <H4
          textTransform="capitalize"
          color="$blue10Dark"
        >
          publishers
        </H4>

        <YGroup
          bordered
          theme="blue"
          separator={<Separator />}
        >
          {game?.publishers?.map((item) => (
            <CustomListItem
              {...item}
              key={item.id}
              type="publisher"
            />
          ))}
        </YGroup>

        <GameCarousel
          title="other games in the series"
          apiEndpoint={`https://api.rawg.io/api/games/${id}/game-series`}
        />
      </YStack>
    </MyScroll>
  );
};

export default Game;
