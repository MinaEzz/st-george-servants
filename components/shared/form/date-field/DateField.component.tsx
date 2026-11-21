import Button from "@/components/UI/button/Button.component";
import { ARABIC_MONTHS } from "@/constants/dates";
import { colors, globalStyles, statusColors } from "@/styles/globals";
import {
  daysInMonth,
  formatNumericDate,
  isValidISODate,
  parseISODate,
  toISODate,
} from "@/utils/dates";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet from "../bottom-sheet/BottomSheet.component";
import { IDateFieldProps, IDateParts } from "./DateField.types";
import PickerColumn from "./picker-column/PickerColumn.component";

function getInitialParts(
  value: string,
  defaultAge: number,
  today: Date,
): IDateParts {
  if (value && isValidISODate(value)) {
    const parsed = parseISODate(value);
    return {
      day: parsed.getDate(),
      month: parsed.getMonth() + 1,
      year: parsed.getFullYear(),
    };
  }

  return { day: 1, month: 1, year: today.getFullYear() - defaultAge };
}

export default function DateField({
  label,
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  error,
  required = false,
  yearsBack = 40,
  defaultAge = 8,
  containerStyle,
}: IDateFieldProps) {
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState<IDateParts>(() =>
    getInitialParts(value, defaultAge, new Date()),
  );

  const currentYear = new Date().getFullYear();

  const yearItems = useMemo(
    () =>
      Array.from({ length: yearsBack + 1 }, (_, index) => {
        const year = currentYear - index;
        return { label: String(year), value: year };
      }),
    [currentYear, yearsBack],
  );

  const monthItems = useMemo(
    () => ARABIC_MONTHS.map((name, index) => ({ label: name, value: index + 1 })),
    [],
  );

  const maxDay = daysInMonth(draft.year, draft.month);
  const selectedDay = Math.min(draft.day, maxDay);

  const dayItems = useMemo(
    () =>
      Array.from({ length: maxDay }, (_, index) => ({
        label: String(index + 1),
        value: index + 1,
      })),
    [maxDay],
  );

  const open = () => {
    setDraft(getInitialParts(value, defaultAge, new Date()));
    setVisible(true);
  };

  const confirm = () => {
    const today = new Date();
    let picked = new Date(draft.year, draft.month - 1, selectedDay);

    // مفيش تاريخ ميلاد في المستقبل
    if (picked.getTime() > today.getTime()) {
      picked = today;
    }

    onChange(toISODate(picked));
    setVisible(false);
  };

  return (
    <View style={[globalStyles.inputGroup, containerStyle]}>
      <Text style={globalStyles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>

      <Pressable
        onPress={open}
        style={[styles.trigger, !!error && styles.triggerError]}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value ? formatNumericDate(value) : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={18} color={colors.neutral[400]} />
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <BottomSheet
        visible={visible}
        title={label}
        scrollable={false}
        onClose={() => setVisible(false)}
        footer={
          <View style={styles.footer}>
            <Button
              variant="fill"
              onPress={confirm}
              style={{ backgroundColor: colors.primary[900] }}
            >
              <Text style={styles.confirmText}>تأكيد</Text>
            </Button>
          </View>
        }
      >
        <View style={styles.columns}>
          <PickerColumn
            label="اليوم"
            items={dayItems}
            selectedValue={selectedDay}
            onSelect={(day) => setDraft((previous) => ({ ...previous, day }))}
            containerStyle={styles.dayColumn}
          />
          <PickerColumn
            label="الشهر"
            items={monthItems}
            selectedValue={draft.month}
            onSelect={(month) =>
              setDraft((previous) => ({ ...previous, month }))
            }
            containerStyle={styles.monthColumn}
          />
          <PickerColumn
            label="السنة"
            items={yearItems}
            selectedValue={draft.year}
            onSelect={(year) => setDraft((previous) => ({ ...previous, year }))}
            containerStyle={styles.yearColumn}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  required: {
    color: statusColors.absent.text,
  },
  trigger: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  triggerError: {
    borderColor: statusColors.absent.text,
  },
  valueText: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[600],
  },
  placeholderText: {
    color: colors.neutral[400],
  },
  errorText: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 12,
    color: statusColors.absent.text,
  },
  columns: {
    flexDirection: "row-reverse",
    gap: 10,
    paddingBottom: 8,
  },
  dayColumn: {
    flex: 1,
  },
  monthColumn: {
    flex: 1.6,
  },
  yearColumn: {
    flex: 1.2,
  },
  footer: {
    marginTop: 16,
  },
  confirmText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
