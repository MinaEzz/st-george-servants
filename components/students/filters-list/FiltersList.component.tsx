import { STUDENTS_FILTERS } from "@/constants";
import { colors } from "@/styles/globals";
import { FlatList, StyleSheet, View } from "react-native";
import FilterItem from "./filter-item/FilterItem.component";

export default function FiltersList({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <View style={styles.filterWrapper}>
      <FlatList
        data={STUDENTS_FILTERS}
        keyExtractor={(item) => item.value}
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted
        contentContainerStyle={styles.filterScroll}
        renderItem={({ item }) => {
          const isActive = item.value === activeFilter;
          return (
            <FilterItem
              label={item.label}
              isActive={isActive}
              onPress={() => onFilterChange(item.value)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: { marginBottom: 15, marginRight: -24, marginLeft: -24 },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  activeFilterBadge: {
    backgroundColor: colors.primary[900],
    borderColor: colors.primary[900],
  },
  filterText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[600],
  },
  activeFilterText: { color: "#fff", fontWeight: "bold" },
});
