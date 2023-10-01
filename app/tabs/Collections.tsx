import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { FAB } from "@rneui/themed";
import { RefreshCw } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { Tabs, Text } from "tamagui";

import CollectionGameCard from "../../components/CollectionGameCard";
import { MyStack } from "../../components/MyStack";
import { db, doc, getDoc } from "../../firebase/firebase";

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
  const { value, data } = props;

  return (
    <Tabs.Content
      value={value}
      flex={1}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => <CollectionGameCard gameID={item.gameID} />}
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
  const [collections, setCollections] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const distributeGames = async (games) => {
    const own = [];
    const wantToPlay = [];
    const played = [];

    games.forEach((item) => {
      switch (item.collectionID) {
        case 0:
          own.push(item);
          break;
        case 1:
          wantToPlay.push(item);
          break;
        case 2:
          played.push(item);
          break;
      }
    });

    return {
      own: own,
      wantToPlay: wantToPlay,
      played: played
    };
  };

  const getGamesFromCollections = async () => {
    setIsLoading(true);

    try {
      const docRef = doc(db, "games", "brijenma@gmail.com");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().collection);

        const collectionObj = await distributeGames(docSnap.data()?.collection);
        setCollections(collectionObj);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGamesFromCollections();
  }, []);

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
          data={collections?.own}
        />
        <TabContent
          value="tab2"
          data={collections?.wantToPlay}
        />
        <TabContent
          value="tab3"
          data={collections?.played}
        />
      </Tabs>

      <FAB
        icon={<RefreshCw size="$1" />}
        placement="right"
        buttonStyle={{
          backgroundColor: darkColors.blue10
        }}
        size="small"
        onPress={getGamesFromCollections}
        loading={isLoading}
      />
    </MyStack>
  );
};

export default Collections;
