import { Loader2 } from "@tamagui/lucide-icons";
import { Button, Spinner, View } from "tamagui";

const LoadMoreItems = (props) => {
  const { isLoadingMore, onPress } = props;

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      marginBottom={30}
    >
      {isLoadingMore ? (
        <Spinner
          size="large"
          color="$blue10Dark"
          marginBottom={30}
        />
      ) : (
        <Button
          icon={Loader2}
          onPress={onPress}
        >
          Load More
        </Button>
      )}
    </View>
  );
};

export default LoadMoreItems;
