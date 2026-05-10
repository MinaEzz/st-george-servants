import FooterSection from "@/components/home/footer-section/FooterSection.component";
import PercentageSection from "@/components/home/percentage-section/PercentageSection.component";
import QuickActionsSection from "@/components/home/quick-actions-section/QuickActionsSection.component";
import ScreenHeader from "@/components/home/screen-header/ScreenHeader.component";
import StatsSection from "@/components/home/stats-section/StatsSection.component";
import { globalStyles } from "@/styles/globals";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader />
        <StatsSection />
        <PercentageSection />
        <QuickActionsSection />
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
}
