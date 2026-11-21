import Button from "@/components/UI/button/Button.component";
import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { FOLLOW_UP_CONSECUTIVE_THRESHOLD } from "@/constants/service";
import { colors, globalStyles, statusColors } from "@/styles/globals";
import { arabicPlural } from "@/utils/arabic";
import { formatShortArabicDate } from "@/utils/dates";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, View } from "react-native";
import { IFollowUpSectionProps } from "./FollowUpSection.types";

const WEEK_FORMS = {
  one: "أسبوع",
  two: "أسبوعين",
  few: "أسابيع",
  many: "أسبوعاً",
};

export default function FollowUpSection({
  status,
  isUpdating,
  onToggleManual,
  onLogFollowUp,
}: IFollowUpSectionProps) {
  const needsFollowUp = status?.needsFollowUp ?? false;
  const absences = status?.consecutiveAbsences ?? 0;

  const lines: string[] = [];

  if (status?.isAuto) {
    lines.push(`غياب متتالي لمدة ${arabicPlural(absences, WEEK_FORMS)}`);
  }
  if (status?.isManual) {
    lines.push("مضاف يدوياً لقائمة المتابعة");
  }
  if (!needsFollowUp && absences > 0) {
    lines.push(
      `غياب متتالي لمدة ${arabicPlural(absences, WEEK_FORMS)} (بيضاف تلقائياً للمتابعة عند ${FOLLOW_UP_CONSECUTIVE_THRESHOLD} أسابيع)`,
    );
  }
  if (!needsFollowUp && absences === 0) {
    lines.push("منتظم في الحضور، ولا يحتاج متابعة حالياً");
  }

  lines.push(
    status?.lastAttendedDate
      ? `آخر حضور: ${formatShortArabicDate(status.lastAttendedDate)}`
      : "لا يوجد حضور مسجل في السجل",
  );

  const palette = needsFollowUp ? statusColors.absent : statusColors.present;

  return (
    <View style={styles.container}>
      <SectionHeader
        title="المتابعة والافتقاد"
        icon={<Ionicons name="heart-outline" />}
      />

      <View
        style={[
          globalStyles.card,
          needsFollowUp && { borderRightColor: statusColors.absent.icon },
        ]}
      >
        <View style={[styles.chip, { backgroundColor: palette.background }]}>
          <Ionicons
            name={needsFollowUp ? "alert-circle" : "checkmark-circle"}
            size={16}
            color={palette.text}
          />
          <Text style={[styles.chipText, { color: palette.text }]}>
            {needsFollowUp ? "يحتاج متابعة" : "منتظم"}
          </Text>
        </View>

        <View style={styles.lines}>
          {lines.map((line) => (
            <Text key={line} style={styles.lineText}>
              {line}
            </Text>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>إضافة لقائمة المتابعة يدوياً</Text>
          <Switch
            value={status?.isManual ?? false}
            onValueChange={onToggleManual}
            disabled={isUpdating || status === null}
            trackColor={{
              false: colors.neutral[200],
              true: colors.secondary[400],
            }}
            thumbColor="#fff"
          />
        </View>

        <Button
          variant="outline"
          onPress={onLogFollowUp}
          style={{ borderColor: colors.primary[900], height: 50 }}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="call-outline" size={20} color={colors.primary[900]} />
            <Text style={styles.buttonText}>تسجيل افتقاد</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  chip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  chipText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    fontWeight: "bold",
  },
  lines: {
    gap: 6,
  },
  lineText: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[600],
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 14,
  },
  switchRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  switchLabel: {
    fontFamily: "Tajawal",
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral[700],
  },
  buttonContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary[900],
  },
});
