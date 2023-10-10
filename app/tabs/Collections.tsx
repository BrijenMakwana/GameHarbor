import { useContext } from "react";
import { FlatList } from "react-native";
import { Tabs, Text } from "tamagui";

import { GAME_COLLECTION } from "../../components/AddToCollections";
import CollectionGameCard from "../../components/CollectionGameCard";
import { MyStack } from "../../components/MyStack";
import { GameContext } from "../../context/context";
import { arrayRemove, db, doc, setDoc } from "../../firebase/firebase";

const TabTitle = (props) => {
  const { title } = props;

  return (
    <Text
      textTransform="capitalize"
      fontWeight="600"
    >
      {title}
    </Text>
  );
};

const TabContent = (props) => {
  const { value, data, removeGameFromCollection } = props;

  return (
    <Tabs.Content
      value={value}
      flex={1}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CollectionGameCard
            {...item}
            removeGameFromCollection={removeGameFromCollection}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 10,
          gap: 20
        }}
      />
    </Tabs.Content>
  );
};

const Collections = () => {
  const { gameCollections, setGameCollections } = useContext(GameContext);

  const removeGameFromCollection = async (collectionID, gameID) => {
    try {
      const gameRef = doc(db, "games", "brijenma@gmail.com");

      await setDoc(
        gameRef,
        {
          collection: arrayRemove({
            gameID: gameID,
            collectionID: collectionID
          })
        },
        {
          merge: true
        }
      );

      setGameCollections((prevGameCollections) =>
        prevGameCollections.filter((game) => game.gameID !== gameID)
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <MyStack>
      <Tabs
        defaultValue="tab1"
        flex={1}
        flexDirection="column"
        paddingTop={10}
        gap={10}
      >
        <Tabs.List
          bordered
          marginHorizontal={5}
          theme="blue"
        >
          <Tabs.Tab
            value="tab1"
            flex={1}
          >
            <TabTitle title="own" />
          </Tabs.Tab>
          <Tabs.Tab
            value="tab2"
            flex={1}
          >
            <TabTitle title="want to play" />
          </Tabs.Tab>

          <Tabs.Tab
            value="tab3"
            flex={1}
          >
            <TabTitle title="played" />
          </Tabs.Tab>
        </Tabs.List>

        <TabContent
          value="tab1"
          data={gameCollections?.filter(
            (game) => game.collectionID === GAME_COLLECTION.OWN
          )}
          removeGameFromCollection={removeGameFromCollection}
        />
        <TabContent
          value="tab2"
          data={gameCollections?.filter(
            (game) => game.collectionID === GAME_COLLECTION.WANT_TO_PLAY
          )}
          removeGameFromCollection={removeGameFromCollection}
        />
        <TabContent
          value="tab3"
          data={gameCollections?.filter(
            (game) => game.collectionID === GAME_COLLECTION.PLAYED
          )}
          removeGameFromCollection={removeGameFromCollection}
        />
      </Tabs>
    </MyStack>
  );
};

export default Collections;
