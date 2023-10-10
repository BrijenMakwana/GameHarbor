import { useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { SpeedDial } from "@rneui/themed";
import {
  Check,
  Gamepad,
  Heart,
  Plus,
  ShieldClose,
  Trophy
} from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";

import { GameContext } from "../context/context";
import { arrayUnion, db, doc, setDoc } from "../firebase/firebase";

export enum GAME_COLLECTION {
  OWN,
  WANT_TO_PLAY,
  PLAYED
}

const SpeedDialAction = (props) => {
  const { Icon, title, onPress } = props;

  return (
    <SpeedDial.Action
      icon={<Icon />}
      title={title}
      onPress={onPress}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
    />
  );
};

const AddToCollections = (props) => {
  const { gameID } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [gameIsPresentInCollection, setGameIsPresentInCollection] =
    useState(false);
  const [gameBelongsToCollection, setGameBelongsToCollection] = useState("");

  const { gameCollections, setGameCollections } = useContext(GameContext);

  const addGameToCollection = async (collectionID) => {
    setIsOpen(false);
    setIsAdding(true);

    try {
      const gameRef = doc(db, "games", "brijenma@gmail.com");

      const gameObj = {
        gameID: gameID,
        collectionID: collectionID
      };

      await setDoc(
        gameRef,
        {
          collection: arrayUnion(gameObj)
        },
        {
          merge: true
        }
      );

      setGameCollections((prevGameCollections) => [
        ...prevGameCollections,
        gameObj
      ]);

      ToastAndroid.show("Game Added successfully!", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsAdding(false);
    }
  };

  const findGameInCollection = () => {
    const gameObj = gameCollections.find((game) => game.gameID === gameID);

    if (!gameObj) return null;

    setGameIsPresentInCollection(true);

    switch (gameObj.collectionID) {
      case GAME_COLLECTION.OWN:
        setGameBelongsToCollection("Own");
        break;
      case GAME_COLLECTION.WANT_TO_PLAY:
        setGameBelongsToCollection("Want to Play");
        break;
      case GAME_COLLECTION.PLAYED:
        setGameBelongsToCollection("Played");
        break;
    }
  };

  useEffect(() => {
    findGameInCollection();
  }, [gameCollections]);

  return (
    <SpeedDial
      isOpen={isOpen}
      icon={gameIsPresentInCollection ? <Check /> : <Plus />}
      openIcon={<ShieldClose />}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
      loading={isAdding}
      title={gameBelongsToCollection}
    >
      <SpeedDialAction
        title="Own"
        Icon={Gamepad}
        onPress={() => addGameToCollection(GAME_COLLECTION.OWN)}
      />
      <SpeedDialAction
        title="Want to Play"
        Icon={Heart}
        onPress={() => addGameToCollection(GAME_COLLECTION.WANT_TO_PLAY)}
      />
      <SpeedDialAction
        title="Played"
        Icon={Trophy}
        onPress={() => addGameToCollection(GAME_COLLECTION.PLAYED)}
      />
    </SpeedDial>
  );
};

export default AddToCollections;
