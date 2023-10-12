import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { Card, H3, Image, Text, YStack } from "tamagui";

const GameConsole = (props) => {
  const { id, name, slug } = props;

  const getConsoleImage = () => {
    switch (slug) {
      case "pc":
        return "https://images.unsplash.com/photo-1603025832572-c5ba1fb6be8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhbWluZyUyMHBjfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
      case "playstation5":
        return "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxheXN0YXRpb24lMjA1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60";
      case "playstation4":
        return "https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxheXN0YXRpb24lMjA0fGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
      case "xbox-one":
        return "https://images.unsplash.com/photo-1560005677-dc4bc1b7c38a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eGJveCUyMG9uZSUyMGJsYWNrfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
      case "xbox-series-x":
        return "https://images.unsplash.com/photo-1683823362932-6f7599661d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHhib3glMjBzZXJpZXMlMjB4fGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
      case "nintendo-switch":
        return "https://images.unsplash.com/photo-1559313910-94b027ad7bfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmludGVuZG8lMjBzd2l0Y2h8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60";
      case "ios":
        return "https://images.unsplash.com/photo-1611648694964-a4cbd6ab1c70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGlwaG9uZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
      case "android":
        return "https://images.unsplash.com/photo-1600087626014-e652e18bbff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGFuZHJvaWQlMjBwaG9uZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
      default:
        return "https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dW5rbm93bnxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
    }
  };

  return (
    <Link
      href={{
        pathname: `/browseGames/${id}`,
        params: { type: "platform" }
      }}
      asChild
    >
      <Card
        pressTheme
        width={170}
      >
        <Image
          source={{
            uri: getConsoleImage()
          }}
          height={230}
          resizeMode="cover"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        />

        <YStack
          flex={1}
          padding={10}
        >
          <Text
            fontWeight="500"
            textAlign="center"
          >
            {name}
          </Text>
        </YStack>
      </Card>
    </Link>
  );
};

const GameConsoleCarousel = () => {
  const [gameConsoles, setGameConsoles] = useState([]);

  const getGameConsoles = async () => {
    try {
      const response = await axios.get("https://api.rawg.io/api/platforms", {
        params: {
          key: process.env.EXPO_PUBLIC_API_KEY,
          page_size: 8
        }
      });

      setGameConsoles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameConsoles();
  }, []);

  return (
    <YStack gap={20}>
      <H3
        textTransform="capitalize"
        color="#fff"
      >
        find games for your consoles
      </H3>

      <FlatList
        data={gameConsoles}
        renderItem={({ item }) => <GameConsole {...item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20
        }}
      />
    </YStack>
  );
};

export default GameConsoleCarousel;
