import AddressSection from "@/components/add-student/address-section/AddressSection.component";
import ContactInfoSection from "@/components/add-student/contact-info-section/ContactInfoSection.component";
import ImageSection from "@/components/add-student/image-section/ImageSection.component";
import PersonalInfoSection from "@/components/add-student/personal-info-section/PersonalInfoSection.component";
import ScreenHeader from "@/components/add-student/screen-header/ScreenHeader.component";
import ServiceSection from "@/components/add-student/service-section/ServiceSection.component";
import { globalStyles } from "@/styles/globals";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function AddStudent() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={[globalStyles.container]}>
        <ScreenHeader />
        <ImageSection />
        <PersonalInfoSection />
        <ServiceSection />
        <ContactInfoSection />
        <AddressSection />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/** personal-info-section DONE
 *  service-section
 *  contact-info-section
 *  address-section
 *  notes-section
 * 1. عايزين السكشن بتاع الصوره يبقي فيه file input بقي بيقبل صور بس و الصوره اللي يختارها المستخدم تظهر في الدايره كدا ب احترافيه 
    <View style={styles.imageSection}>
      <TouchableOpacity style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>أضف صورة</Text>
        <View style={styles.editIconBadge}>
          <Feather name="edit-2" size={12} style={styles.editIcon} />
        </View>
      </TouchableOpacity>
    </View>

2. عايزين ال gender تبقي dropdown يختار ذكر او انثي 
export const GENDER_OPTIONS = [
  {
    label: "ذكر",
    value: "male",
  },
  {
    label: "انثى",
    value: "female",
  },
];

3. تاريخ الميلاد عايزنها تبقي date input 
و هتبقي لقطه حلوه لو حسبنالهم السن من تاريخ الميلاد اول م يدخلوه 
import { colors, globalStyles } from "@/styles/globals";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function PersonalInfoForm() {
  return (
    <View style={globalStyles.form}>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>الاسم الكامل</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="أدخل اسم المخدوم رباعي"
          placeholderTextColor={colors.neutral[400]}
          value={""}
        />
      </View>

      <View style={styles.row}>
        <View style={[globalStyles.inputGroup, { flex: 1 }]}>
          <Text style={globalStyles.label}>النوع</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="اختر النوع"
            placeholderTextColor={colors.neutral[400]}
            value={""}
          />
        </View>

        <View style={[globalStyles.inputGroup, { flex: 1 }]}>
          <Text style={globalStyles.label}>تاريخ الميلاد</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor={colors.neutral[400]}
            value={""}
          />
        </View>
      </View>

      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>العمر</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="عمر المخدوم يحسب تلقائياً"
          placeholderTextColor={colors.neutral[400]}
          value={""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 20,
  },
});

 */

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#002147", // اللون الكحلي الغامق
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
