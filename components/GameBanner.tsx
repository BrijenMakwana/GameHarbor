import { StyleSheet } from "react-native";
import { Image, View } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const GameBanner = (props) => {
  const { url } = props;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={styles.image}
      />
      <LinearGradient
        colors={["transparent", "#111111"]}
        style={styles.overlay}
      />
    </View>
  );
};

export default GameBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  }
});
