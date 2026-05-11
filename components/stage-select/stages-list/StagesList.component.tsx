import { STAGES } from "@/constants/stages";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import StageCard from "./stage-card/StageCard.component";

export default function StagesList() {
  const router = useRouter();

  return (
    <FlatList
      data={STAGES}
      renderItem={({ item }) => (
        <StageCard
          item={item}
          onPress={() => {
            router.push({
              pathname: "/(selection)/class-select",
              params: { stageId: item.id, stageName: item.name },
            });
          }}
        />
      )}
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
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

// () =>
// router.push({
//   pathname: "/(selection)/class-select",
//   params: { stageId: item.id, stageName: item.name },
// })
