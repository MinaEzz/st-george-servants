import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: {
          //   height: 74,
          //   paddingBottom: 10,
          //   paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: colors.neutral[100],
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: {
          fontFamily: "Tajawal",
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          title: "الحساب",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="students"
        options={{
          title: "المخدومين",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="attendance"
        options={{
          title: "الحضور",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
