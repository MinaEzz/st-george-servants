import Button from "@/components/UI/button/Button.component";
import BottomSheet from "@/components/shared/form/bottom-sheet/BottomSheet.component";
import FormField from "@/components/shared/form/form-field/FormField.component";
import {
  CONTACT_METHOD_ICONS,
  CONTACT_METHOD_LABELS,
  CONTACT_METHODS,
} from "@/constants/service";
import { getErrorMessage } from "@/services/errors";
import { colors, globalStyles, statusColors } from "@/styles/globals";
import type { ContactMethod } from "@/types/note.types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { INoteFormModalProps } from "./NoteFormModal.types";

function getTitle(mode: "add" | "edit", isFollowUp: boolean): string {
  if (mode === "edit") {
    return isFollowUp ? "تعديل سجل الافتقاد" : "تعديل الملاحظة";
  }
  return isFollowUp ? "تسجيل افتقاد" : "إضافة ملاحظة";
}

/**
 * الأب بيدّي الـ Modal key جديد في كل فتح (openId) عشان يبدأ بحالة نضيفة،
 * وبالتالي الـ state الداخلي بيتهيأ مرة واحدة من الـ props.
 */
export default function NoteFormModal({
  visible,
  mode,
  kind,
  note,
  onClose,
  onSubmit,
}: INoteFormModalProps) {
  const isFollowUp = kind === "follow-up";

  const [body, setBody] = useState(note?.body ?? "");
  const [contactMethod, setContactMethod] = useState<ContactMethod>(
    note?.contactMethod ?? "call",
  );
  const [bodyError, setBodyError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!body.trim()) {
      setBodyError(isFollowUp ? "اكتب تفاصيل الافتقاد" : "اكتب نص الملاحظة");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({
        body,
        contactMethod: isFollowUp ? contactMethod : null,
      });
    } catch (caught) {
      setSubmitError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomSheet visible={visible} title={getTitle(mode, isFollowUp)} onClose={onClose}>
      <View style={globalStyles.form}>
        {isFollowUp ? (
          <View style={globalStyles.inputGroup}>
            <Text style={globalStyles.label}>وسيلة الافتقاد</Text>
            <View style={styles.chipsRow}>
              {CONTACT_METHODS.map((method) => {
                const isSelected = method === contactMethod;

                return (
                  <Pressable
                    key={method}
                    onPress={() => setContactMethod(method)}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                  >
                    <Ionicons
                      name={CONTACT_METHOD_ICONS[method]}
                      size={16}
                      color={isSelected ? "#fff" : colors.neutral[600]}
                    />
                    <Text
                      style={[styles.chipText, isSelected && styles.chipTextSelected]}
                    >
                      {CONTACT_METHOD_LABELS[method]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        <FormField
          label={isFollowUp ? "تفاصيل الافتقاد" : "نص الملاحظة"}
          required
          multiline
          value={body}
          onChangeText={(text) => {
            setBody(text);
            setBodyError(undefined);
            setSubmitError(null);
          }}
          placeholder={
            isFollowUp
              ? "مثال: اتصلت بولي الأمر وأكد إنه هيحضر الجمعة الجاية"
              : "اكتب ملاحظتك عن المخدوم..."
          }
          error={bodyError}
        />

        {submitError ? (
          <View style={styles.errorBanner}>
            <Ionicons
              name="alert-circle"
              size={18}
              color={statusColors.absent.text}
            />
            <Text style={styles.errorText}>{submitError}</Text>
          </View>
        ) : null}

        <Button
          variant="fill"
          onPress={handleSubmit}
          loading={isSubmitting}
          style={{ backgroundColor: colors.primary[900] }}
        >
          <Text style={styles.submitText}>
            {mode === "edit" ? "حفظ التعديل" : "حفظ"}
          </Text>
        </Button>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary[900],
    borderColor: colors.primary[900],
  },
  chipText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    fontWeight: "600",
    color: colors.neutral[600],
  },
  chipTextSelected: {
    color: "#fff",
  },
  errorBanner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    backgroundColor: statusColors.absent.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorText: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 13,
    color: statusColors.absent.text,
  },
  submitText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
