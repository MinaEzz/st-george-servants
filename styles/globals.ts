import { StyleSheet } from "react-native";

export const colors = {
  background: "#F2EFE9",
  primary: {
    50: "#f3f7fc",
    100: "#e5edf9",
    200: "#c6daf1",
    300: "#93bae6",
    400: "#5a97d6",
    500: "#357ac2",
    600: "#255fa4",
    700: "#1f4c85",
    800: "#1d426f",
    900: "#1e3a5f", // used
    950: "#13243e",
  },
  secondary: {
    50: "#fcfaea",
    100: "#faf4c7",
    200: "#f6e792",
    300: "#f0d254",
    400: "#eabc25",
    500: "#d4a017", // used
    600: "#bc8012",
    700: "#965c12",
    800: "#7d4916",
    900: "#6a3d19",
    950: "#3e1f0a",
  },
  tertiary: {
    50: "#f8f6f1",
    100: "#f1ede3",
    200: "#e2d9c6",
    300: "#cfc0a2",
    400: "#bba27c",
    500: "#ad8d62",
    600: "#a07b56",
    700: "#856449",
    800: "#6d523f",
    900: "#594435",
    950: "#2f231b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e5e5e6",
    300: "#d5d5d7",
    400: "#a4a4a7",
    500: "#77777a",
    600: "#555558",
    700: "#414144",
    800: "#282829",
    900: "#19191a",
    950: "#0a0a0a",
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 30,
    alignItems: "flex-end",
  },
});
