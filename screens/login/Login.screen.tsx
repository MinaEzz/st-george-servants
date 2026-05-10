import LoginForm from "@/components/login/login-form/LoginForm.component";
import ScreenHeader from "@/components/login/screen-header/ScreenHeader.component";
import { globalStyles } from "@/styles/globals";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ScreenHeader />
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
