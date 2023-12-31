import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { Link } from "expo-router";
import { Avatar, H4, Text } from "tamagui";

const Creator = (props) => {
  const { id, image, name, positions } = props;

  return (
    <Link
      href={{
        pathname: `/browseGames/${id}`,
        params: { type: "creator" }
      }}
      asChild
    >
      <Pressable
        android_ripple={{
          color: darkColors.gray10
        }}
        style={{
          alignItems: "center",
          gap: 8,
          padding: 5
        }}
      >
        <Avatar
          circular
          size="$6"
        >
          <Avatar.Image
            src={
              image ||
              "https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            }
            resizeMode="cover"
          />
          <Avatar.Fallback bc="$blue10Dark" />
        </Avatar>

        <Text textTransform="capitalize">{name}</Text>

        <Text
          textTransform="capitalize"
          fontSize={13}
          color="$gray11Dark"
        >
          {positions[0]?.name}
        </Text>
      </Pressable>
    </Link>
  );
};

const GameCreators = (props) => {
  const { id } = props;
  const [gameCreators, setGameCreators] = useState([]);

  const getGameCreators = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/development-team`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGameCreators(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGameCreators();
  }, []);

  if (gameCreators?.length === 0) return;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="#fff"
      >
        creators of the game
      </H4>
      <FlatList
        data={gameCreators}
        renderItem={({ item }) => <Creator {...item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15
        }}
      />
    </>
  );
};

export default GameCreators;
