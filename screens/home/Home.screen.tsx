import FooterSection from "@/components/home/footer-section/FooterSection.component";
import PercentageSection from "@/components/home/percentage-section/PercentageSection.component";
import QuickActionsSection from "@/components/home/quick-actions-section/QuickActionsSection.component";
import RecentUpdatesSection from "@/components/home/recent-updates-section/RecentUpdatesSection.component";
import ScreenHeader from "@/components/home/screen-header/ScreenHeader.component";
import StatsSection from "@/components/home/stats-section/StatsSection.component";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { stageName, className } = useLocalSearchParams();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          stageName={stageName as string}
          className={className as string}
        />
        <StatsSection />
        <PercentageSection />
        <QuickActionsSection />
        <RecentUpdatesSection />
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
}
