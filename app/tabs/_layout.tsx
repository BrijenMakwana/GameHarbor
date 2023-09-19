import { Gamepad2, Home, Search, UserCircle2 } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: darkColors.blue10,
        tabBarInactiveTintColor: darkColors.gray11,
        tabBarLabelStyle: {
          textTransform: "capitalize"
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home
              size="$1.5"
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search Games",
          tabBarIcon: ({ color }) => (
            <Search
              size="$1.5"
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="Collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ color }) => (
            <Gamepad2
              size="$1.5"
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <UserCircle2
              size="$1.5"
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
