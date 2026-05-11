import { CLASSES } from "@/constants/classes";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import ClassCard from "./class-card/ClassCard.component";

export default function ClassesList({
  stageId,
  stageName,
}: {
  stageId: string;
  stageName: string;
}) {
  const router = useRouter();
  const filteredClasses = CLASSES.filter((c) => c.stageId === stageId);

  return (
    <FlatList
      data={filteredClasses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClassCard
          item={item}
          onPress={() =>
            router.push({
              pathname: "/(tabs)",
              params: { className: item.name, stageName },
            })
          }
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingBottom: 100 },
});
