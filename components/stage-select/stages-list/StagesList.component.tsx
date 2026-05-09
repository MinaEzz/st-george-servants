import { FlatList, StyleSheet } from "react-native";
import { STAGES } from "@/constants/stages";
import StageCard from "./stage-card/StageCard.component";

export default function StagesList() {
  return (
    <FlatList
      data={STAGES}
      renderItem={({ item }) => <StageCard item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
