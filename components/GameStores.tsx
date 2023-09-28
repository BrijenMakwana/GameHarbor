import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { openURL } from "expo-linking";
import { Button, H4, XStack } from "tamagui";

const GameStore = (props) => {
  const { url, store_id } = props;

  const goToStore = () => openURL(url);

  const getStoreInfo = () => {
    let storeTitle, storeIconName;

    switch (store_id) {
      case 1:
        storeIconName = "steam";
        storeTitle = "Steam";
        break;
      case 3:
        storeIconName = "sony-playstation";
        storeTitle = "Playstation Store";
        break;
      case 2:
        storeIconName = "microsoft-xbox";
        storeTitle = "Xbox Store";
        break;
      case 4:
        storeIconName = "apple";
        storeTitle = "App Store";
        break;
      case 5:
        storeIconName = "gog";
        storeTitle = "GOG";
        break;
      case 6:
        storeIconName = "nintendo-switch";
        storeTitle = "Nintendo Store";
        break;
      case 7:
        storeIconName = "microsoft-xbox";
        storeTitle = "Xbox 360 Store";
        break;
      case 11:
        storeIconName = "store";
        storeTitle = "Epic Games";
        break;
      default:
        storeIconName = "file-question";
        storeTitle = "Unknown";
    }

    const StoreIcon = (
      <MaterialCommunityIcons
        name={storeIconName}
        size={24}
        color="#fff"
      />
    );

    return { StoreIcon, storeTitle };
  };

  const { StoreIcon, storeTitle } = getStoreInfo();

  return (
    <Button
      onPress={goToStore}
      theme="blue"
      iconAfter={StoreIcon}
    >
      {storeTitle}
    </Button>
  );
};

const GameStores = (props) => {
  const { id } = props;

  const [gameStores, setGameStores] = useState([]);

  const getGameStores = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/stores`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setGameStores(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      // This code block will always be executed
    }
  };

  useEffect(() => {
    getGameStores();
  }, []);

  if (gameStores?.length === 0) return;

  return (
    <>
      <H4
        textTransform="capitalize"
        color="$blue10Dark"
      >
        buy it from here
      </H4>

      <XStack
        alignItems="center"
        flexWrap="wrap"
        gap={10}
      >
        {gameStores?.map((item) => (
          <GameStore
            key={item.id}
            {...item}
          />
        ))}
      </XStack>
    </>
  );
};

export default GameStores;
