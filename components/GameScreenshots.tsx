import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import axios from "axios";
import { H4, Image, YStack } from "tamagui";

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

  if (gameScreenshots.length === 0) return;

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

export default GameScreenshots;
