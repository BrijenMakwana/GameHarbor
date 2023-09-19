import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

const SearchBar = (props) => {
  const { searchedGame, setSearchedGame, onPress, onClear } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={10}
      paddingVertical={5}
      gap={10}
    >
      <Input
        theme="blue"
        placeholder="Search your games here..."
        value={searchedGame}
        onChangeText={(text) => setSearchedGame(text)}
        onSubmitEditing={onPress}
        flex={1}
      />

      <Button
        theme="blue"
        icon={Search}
        disabled={!searchedGame}
        onPress={onPress}
        opacity={searchedGame ? 1 : 0.5}
      />

      {searchedGame && (
        <Button
          theme="red"
          icon={Delete}
          onPress={onClear}
        />
      )}
    </XStack>
  );
};

export default SearchBar;
