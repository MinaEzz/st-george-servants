import { CLASSES } from "@/constants/classes";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import ClassCard from "./class-card/ClassCard.component";

export default function ClassesList({ stageId }: { stageId: string }) {
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
            router.push({ pathname: "/", params: { classId: item.id } })
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

// onPress={() => router.push({ pathname: "/(main)/home", params: { classId: item.id } })}
