import ScreenHeader from "@/components/stage-select/screen-header/ScreenHeader.component";
import StagesList from "@/components/stage-select/stages-list/StagesList.component";
import { globalStyles } from "@/styles/globals";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StageSelect() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScreenHeader />
      <StagesList />
    </SafeAreaView>
  );
}
