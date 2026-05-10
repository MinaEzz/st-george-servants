import AddClassForm from "@/components/add-class/add-class-form/AddClassForm.component";
import ScreenHeader from "@/components/add-class/screen-header/ScreenHeader.component";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddClass() {
  const { stageId, stageName } = useLocalSearchParams();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <ScreenHeader stageName={stageName as string} />
        <AddClassForm stageId={stageId as string} />
      </ScrollView>
    </SafeAreaView>
  );
}
