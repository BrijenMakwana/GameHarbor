import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import axios from "axios";
import { ResizeMode, Video } from "expo-av";
import { H4, YStack } from "tamagui";

const GameTrailers = (props) => {
  const { id } = props;

  const [gameTrailers, setGameTrailers] = useState([]);

  const getGameTrailers = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/movies`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGameTrailers(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGameTrailers();
  }, []);

  if (gameTrailers.length === 0) return;

  return (
    <YStack space={15}>
      <H4
        textTransform="capitalize"
        color="$blue10Dark"
      >
        trailers
      </H4>
      <FlatList
        data={gameTrailers}
        renderItem={({ item }) => (
          <Video
            style={{
              width: Dimensions.get("window").width,
              aspectRatio: 16 / 9
            }}
            source={{
              uri: item.data.max
            }}
            posterSource={{
              uri: item.preview
            }}
            posterStyle={{
              resizeMode: "cover"
            }}
            usePoster
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
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

export default GameTrailers;
