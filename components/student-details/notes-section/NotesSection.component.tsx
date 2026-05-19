import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import NoteCard from "./note-card/NoteCard.component";

export default function NotesSection({ studentId }: { studentId: string }) {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="ملاحظات الخدام"
        icon={<Ionicons name="chatbubbles-outline" />}
        viewAllHref="/"
      />
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
});
