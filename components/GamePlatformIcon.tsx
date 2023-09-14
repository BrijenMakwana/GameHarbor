import { MaterialCommunityIcons } from "@expo/vector-icons";

const GamePlatformIcon = (props) => {
  const { platformName } = props;

  const getPlatformIconName = (platformName: string) => {
    if (platformName.startsWith("xbox")) return "microsoft-xbox";
    if (platformName.startsWith("playstation")) return "sony-playstation";
    if (platformName.startsWith("pc")) return "microsoft-windows";
    if (platformName.startsWith("nintendo")) return "nintendo-switch";
    if (platformName.startsWith("ios")) return "apple";
    if (platformName.startsWith("android")) return "android";
    if (platformName.startsWith("mac")) return "desktop-mac";
    if (platformName.startsWith("linux")) return "linux";
    if (platformName.startsWith("web")) return "web";

    return "file-question";
  };

  return (
    <MaterialCommunityIcons
      name={getPlatformIconName(platformName)}
      size={24}
      color="#fff"
    />
  );
};

export default GamePlatformIcon;
