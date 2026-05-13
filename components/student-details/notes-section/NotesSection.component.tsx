import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NoteCard from "./note-card/NoteCard.component";

export default function NotesSection({ studentId }: { studentId: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="chatbubbles-outline"
            size={24}
            color={colors.primary[900]}
          />
          <Text style={styles.sectionTitle}>ملاحظات الخدام</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>عرض الكل</Text>
        </TouchableOpacity>
      </View>
      <NoteCard
        servantName="ا. عماد فوزي"
        timeText="منذ يومين"
        noteBody="الطالب يحتاج للاهتمام بدرس المحفوظات القادم. تم التواصل مع ولي الأمر بخصوص نشاط الجمعة."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  viewAll: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.secondary[400],
  },
});
