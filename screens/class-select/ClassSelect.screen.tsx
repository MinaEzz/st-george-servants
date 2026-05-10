import ClassesList from "@/components/class-select/classes-list/ClassesList.component";
import ScreenHeader from "@/components/class-select/screen-header/ScreenHeader.component";
import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClassSelect() {
  const { stageId, stageName } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader stageName={stageName as string} />
      <ClassesList stageId={stageId as string} />

      <View style={styles.footer}>
        <Button
          onPress={() =>
            router.push({
              pathname: "/(selection)/add-class",
              params: { stageId, stageName },
            })
          }
          variant="outline"
        >
          <Ionicons name="add" size={20} color={colors.primary[600]} />
          <Text style={styles.addBtnText}>إضافة فصل جديد</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: colors.background,
  },
  addBtnText: {
    color: colors.primary[600],
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
});
