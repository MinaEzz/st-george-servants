import ForgotPasswordForm from "@/components/forgot-password/forgot-password-form/ForgotPasswordForm.component";
import ScreenHeader from "@/components/forgot-password/screen-header/ScreenHeader.component";
import { globalStyles } from "@/styles/globals";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader />
        <ForgotPasswordForm />
      </ScrollView>
    </SafeAreaView>
  );
}
