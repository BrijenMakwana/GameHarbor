import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { HtmlText } from "@e-mine/react-native-html-text";
import { PanelTopOpen, UserCircle2 } from "@tamagui/lucide-icons";
import axios from "axios";
import { openURL } from "expo-linking";
import moment from "moment";
import {
  Button,
  Card,
  H3,
  Sheet,
  Spinner,
  Text,
  XStack,
  YStack
} from "tamagui";

import LoadMoreItems from "./LoadMoreItems";

const RedditPost = (props) => {
  const { name, text, created, username, url } = props;

  const formattedUsername = username?.replace(/^\/u\//, "");

  const goToRedditPostURL = () => {
    openURL(url);
  };

  return (
    <Card
      padded
      gap={10}
      pressTheme
      onPress={goToRedditPostURL}
    >
      <Card.Header padding={0}>
        <Text
          fontWeight="600"
          fontSize={15}
        >
          {name}
        </Text>
      </Card.Header>

      {text && (
        <Text>
          <HtmlText>{text}</HtmlText>
        </Text>
      )}

      <YStack
        alignItems="flex-end"
        gap={10}
      >
        <XStack
          alignItems="center"
          gap={5}
        >
          <UserCircle2 />
          <Text>{formattedUsername}</Text>
        </XStack>

        <Text
          fontSize={13}
          color="$gray11Dark"
        >
          posted {moment(created).fromNow()}
        </Text>
      </YStack>
    </Card>
  );
};

const RedditPostSheet = (props) => {
  const { open, setOpen, id } = props;

  const [redditPosts, setRedditPosts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const getRedditPosts = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/reddit`,
        {
          params: {
            key: process.env.EXPO_PUBLIC_API_KEY,
            page: page
          }
        }
      );

      setRedditPosts([...redditPosts, ...response.data.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadMorePosts = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getRedditPosts();
  }, [page]);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle theme="blue" />
      <Sheet.Frame theme="blue">
        {redditPosts.length === 0 ? (
          <Spinner
            size="large"
            color="$blue10Dark"
          />
        ) : (
          <FlatList
            data={redditPosts}
            renderItem={({ item }) => <RedditPost {...item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <H3>See what people are saying about this game</H3>
            )}
            ListFooterComponent={() => (
              <LoadMoreItems
                isLoadingMore={isLoadingMore}
                onPress={loadMorePosts}
              />
            )}
            contentContainerStyle={{
              gap: 15,
              padding: 15
            }}
          />
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

const RedditPostsBtn = (props) => {
  const { id } = props;
  const [postSheetIsopen, setPostSheetIsOpen] = useState(false);

  const openRedditPostSheet = () => {
    setPostSheetIsOpen(true);
  };

  return (
    <>
      <Button
        theme="blue"
        onPress={openRedditPostSheet}
        alignSelf="flex-start"
        iconAfter={PanelTopOpen}
      >
        See Reddit Posts
      </Button>
      {postSheetIsopen && (
        <RedditPostSheet
          open={postSheetIsopen}
          setOpen={setPostSheetIsOpen}
          id={id}
        />
      )}
    </>
  );
};

export default RedditPostsBtn;
