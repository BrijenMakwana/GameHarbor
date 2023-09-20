import { Tabs, Text } from "tamagui";

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
  return (
    <MyStack>
      <Tabs
        defaultValue="tab1"
        flex={1}
        flexDirection="column"
        theme="blue"
        paddingTop={10}
      >
        <Tabs.List
          bordered
          marginHorizontal={5}
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

        <Tabs.Content value="tab1"></Tabs.Content>
        <Tabs.Content value="tab2"></Tabs.Content>
        <Tabs.Content value="tab3"></Tabs.Content>
      </Tabs>
    </MyStack>
  );
};

export default Collections;
