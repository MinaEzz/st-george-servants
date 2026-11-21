import { colors, globalStyles, statusColors } from "@/styles/globals";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IFormFieldProps } from "./FormField.types";

export default function FormField({
  label,
  error,
  hint,
  required = false,
  readOnly = false,
  multiline = false,
  containerStyle,
  ...inputProps
}: IFormFieldProps) {
  return (
    <View style={[globalStyles.inputGroup, containerStyle]}>
      <Text style={globalStyles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>

      <TextInput
        placeholderTextColor={colors.neutral[400]}
        {...inputProps}
        multiline={multiline}
        editable={!readOnly}
        style={[
          globalStyles.input,
          multiline && globalStyles.textArea,
          multiline && styles.multiline,
          readOnly && styles.readOnly,
          !!error && styles.inputError,
        ]}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  required: {
    color: statusColors.absent.text,
  },
  multiline: {
    textAlignVertical: "top",
  },
  readOnly: {
    backgroundColor: colors.neutral[100],
    color: colors.neutral[500],
  },
  inputError: {
    borderColor: statusColors.absent.text,
  },
  errorText: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 12,
    color: statusColors.absent.text,
  },
  hintText: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[500],
  },
});
