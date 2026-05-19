import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function Searchbar({
  value,
  onChange,
  placeholder = "ابحث هنا...",
}: {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          value={value}
          onChangeText={onChange}
          textAlign="right"
        />
        <Ionicons name="search" size={20} color={colors.neutral[400]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  searchInput: {
    flex: 1,
    fontFamily: "Tajawal",
    fontSize: 14,
    marginRight: 10,
    color: colors.primary[900],
  },
});
