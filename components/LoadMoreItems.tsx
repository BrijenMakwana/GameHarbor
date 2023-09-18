import { Loader2 } from "@tamagui/lucide-icons";
import { Button, Spinner } from "tamagui";

const LoadMoreItems = (props) => {
  const { isLoadingMore, onPress } = props;

  if (isLoadingMore)
    return (
      <Spinner
        size="large"
        color="$blue10Dark"
        marginBottom={30}
      />
    );

  return (
    <Button
      icon={Loader2}
      onPress={onPress}
      alignSelf="center"
      marginBottom={30}
    >
      Load More
    </Button>
  );
};

export default LoadMoreItems;
