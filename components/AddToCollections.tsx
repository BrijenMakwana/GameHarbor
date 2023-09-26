import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import {
  Gamepad,
  Heart,
  Plus,
  ShieldClose,
  Trophy
} from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";

import { arrayUnion, db, doc, setDoc } from "../firebase/firebase";

enum GAME_COLLECTION {
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

  const addGameToCollection = async (collectionID) => {
    setIsOpen(false);
    setIsAdding(true);

    try {
      const gameRef = doc(db, "games", "brijenma@gmail.com");

      switch (collectionID) {
        case GAME_COLLECTION.OWN:
          await setDoc(
            gameRef,
            {
              own: arrayUnion(gameID)
            },
            {
              merge: true
            }
          );
          break;
        case GAME_COLLECTION.WANT_TO_PLAY:
          await setDoc(
            gameRef,
            {
              wantToPlay: arrayUnion(gameID)
            },
            {
              merge: true
            }
          );
          break;
        case GAME_COLLECTION.PLAYED:
          await setDoc(
            gameRef,
            {
              played: arrayUnion(gameID)
            },
            {
              merge: true
            }
          );
          break;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <SpeedDial
      isOpen={isOpen}
      icon={<Plus />}
      openIcon={<ShieldClose />}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
      loading={isAdding}
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
