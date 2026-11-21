import { CLASSES } from "@/constants/classes";
import { useSession } from "@/store/session.store";
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
  const { selectScope } = useSession();
  const filteredClasses = CLASSES.filter((c) => c.stageId === stageId);

  return (
    <FlatList
      data={filteredClasses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClassCard
          item={item}
          onPress={() => {
            // بنحفظ المرحلة والفصل المختارين عشان باقي الشاشات (زي إضافة مخدوم) تستخدمهم
            selectScope({
              stageId,
              stageName,
              classId: item.id,
              className: item.name,
            });

            router.push({
              pathname: "/(tabs)",
              params: { className: item.name, stageName },
            });
          }}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingBottom: 100 },
});
