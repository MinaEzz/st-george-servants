import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { colors, globalStyles } from "@/styles/globals";
import { formatRelativeArabic } from "@/utils/dates";
import { StyleSheet, Text, View } from "react-native";
import NoteCard from "./note-card/NoteCard.component";
import { INotesSectionProps } from "./NotesSection.types";

/** بيتستخدم مرتين في تفاصيل المخدوم: ملاحظات الخدام وسجل الافتقاد */
export default function NotesSection({
  title,
  icon,
  notes,
  emptyText,
  onEdit,
  onDelete,
}: INotesSectionProps) {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} icon={icon} />

      {notes.length === 0 ? (
        <View style={globalStyles.card}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      ) : (
        notes.map((note) => {
          const wasEdited = note.updatedAt !== note.createdAt;
          const timeText = `${formatRelativeArabic(note.createdAt)}${wasEdited ? " (معدّلة)" : ""}`;

          return (
            <NoteCard
              key={note.id}
              servantName={note.authorName}
              timeText={timeText}
              noteBody={note.body}
              kind={note.kind}
              contactMethod={note.contactMethod}
              onEdit={() => onEdit(note)}
              onDelete={() => onDelete(note)}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  emptyText: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
  },
});
