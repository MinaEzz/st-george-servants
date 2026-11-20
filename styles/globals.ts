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

/** ألوان حالات الحضور (كانت متكررة hardcoded في كذا ملف) */
export const statusColors = {
  present: { background: "#E8F5E9", text: "#2E7D32", icon: "#388E3C" },
  absent: { background: "#FFEBEE", text: "#C62828", icon: "#D32F2F" },
  excused: { background: "#FFF3E0", text: "#F57C00", icon: "#F57C00" },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 30,
} as const;

export const radius = {
  input: 10,
  button: 12,
  card: 24,
  cardSmall: 20,
  pill: 999,
} as const;

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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Tajawal",
    color: colors.neutral[600],
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[600],
    textAlign: "right",
  },
  textArea: {
    minHeight: 100,
  },
  /** الكارت الأساسي: أبيض + حواف ناعمة + الشريط الذهبي الجانبي */
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    borderRightWidth: 5,
    borderRightColor: colors.secondary[400],
  },
  /** مسافة الأقسام الرأسية داخل الشاشات (add-student مثلاً) */
  section: {
    marginVertical: 20,
  },
});
