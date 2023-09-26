import { useState } from "react";
import { FlatList } from "react-native";
import { Tabs, Text } from "tamagui";

import GameTile from "../../components/GameTile";
import { MyStack } from "../../components/MyStack";

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

const Collections = () => {
  const [gameIDs, setGameIDs] = useState([
    "3498",
    "1133",
    "1135",
    "3497",
    "3496",
    "3495"
  ]);

  return (
    <MyStack>
      <Tabs
        defaultValue="tab1"
        flex={1}
        flexDirection="column"
        paddingTop={10}
        gap={20}
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

        <Tabs.Content
          value="tab1"
          flex={1}
        >
          <FlatList
            data={gameIDs}
            renderItem={({ item }) => <GameTile gameID={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: 10,
              gap: 15
            }}
          />
        </Tabs.Content>

        <Tabs.Content
          value="tab2"
          flex={1}
        ></Tabs.Content>
        <Tabs.Content
          value="tab3"
          flex={1}
        ></Tabs.Content>
      </Tabs>
    </MyStack>
  );
};

export default Collections;
