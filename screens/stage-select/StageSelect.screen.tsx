import ScreenHeader from "@/components/stage-select/screen-header/ScreenHeader.component";
import StagesList from "@/components/stage-select/stages-list/StagesList.component";
import { colors } from "@/styles/globals";
import { SafeAreaView, StyleSheet } from "react-native";

export default function StageSelect() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />
      <StagesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
});
