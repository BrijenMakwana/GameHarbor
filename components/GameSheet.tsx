import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { H3, Image, Sheet, Spinner, Text, YStack } from "tamagui";

const GameSheet = (props) => {
  const { open, setOpen, id } = props;
  const [gameScreenshots, setGameScreenshots] = useState([]);

  const getGame = async () => {
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
    getGame();
  }, []);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame theme="blue">
        {!gameScreenshots ? (
          <Spinner
            size="large"
            color="$green10Dark"
          />
        ) : (
          <YStack
            gap={20}
            padding={20}
            flex={1}
          ></YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

export default GameSheet;
