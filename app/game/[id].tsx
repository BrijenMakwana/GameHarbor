import React, { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Avatar, H2, H3, H4, Image, Text, YGroup, YStack } from "tamagui";

import GameGenre from "../../components/GameGenre";
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
        resizeMode="contain"
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
            resizeMode="contain"
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
      console.log(response.data.dominant_color);
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
    <MyScroll
      showsVerticalScrollIndicator={false}
      space={10}
    >
      <GameBanner
        avatarImage={game?.background_image}
        bannerImage={game?.background_image_additional}
      />

      <H2
        color="$blue10Dark"
        paddingHorizontal={5}
        marginTop={60}
      >
        {game?.name}
      </H2>

      <YStack
        padding={10}
        space={15}
      >
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
          genres
        </H4>

        <YGroup theme="blue">
          {game?.genres?.map((item) => (
            <GameGenre
              {...item}
              key={item.id}
            />
          ))}
        </YGroup>
      </YStack>
    </MyScroll>
  );
};

export default Game;
