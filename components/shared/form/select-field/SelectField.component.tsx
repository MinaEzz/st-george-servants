import { colors, globalStyles, statusColors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet from "../bottom-sheet/BottomSheet.component";
import { ISelectFieldProps } from "./SelectField.types";

export default function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "اختر",
  error,
  required = false,
  disabled = false,
  sheetTitle,
  emptyText = "لا توجد اختيارات متاحة",
  containerStyle,
}: ISelectFieldProps) {
  const [visible, setVisible] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <View style={[globalStyles.inputGroup, containerStyle]}>
      <Text style={globalStyles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>

      <Pressable
        onPress={() => setVisible(true)}
        disabled={disabled}
        style={[
          styles.trigger,
          !!error && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[styles.valueText, !selected && styles.placeholderText]}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.neutral[400]} />
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <BottomSheet
        visible={visible}
        title={sheetTitle ?? label}
        onClose={() => setVisible(false)}
      >
        {options.length === 0 ? (
          <Text style={styles.emptyText}>{emptyText}</Text>
        ) : (
          <View style={styles.optionsList}>
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    setVisible(false);
                  }}
                  style={[styles.option, isSelected && styles.optionSelected]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={colors.secondary[500]}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        )}
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
  triggerDisabled: {
    backgroundColor: colors.neutral[100],
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
  emptyText: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
    paddingVertical: 24,
  },
  optionsList: {
    gap: 8,
    paddingBottom: 8,
  },
  option: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionSelected: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  optionText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    color: colors.neutral[700],
  },
  optionTextSelected: {
    fontWeight: "bold",
    color: colors.primary[900],
  },
});
