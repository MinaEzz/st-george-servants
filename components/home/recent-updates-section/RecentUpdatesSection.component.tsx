import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { StyleSheet, View } from "react-native";
import RecentUpdateCard from "./recent-update-card/RecentUpdateCard.component";

export default function RecentUpdatesSection() {
  return (
    <View style={styles.container}>
      <SectionHeader title="آخر التحديثات" viewAllHref={"/"} />
      <RecentUpdateCard
        title="تم تسجيل غياب: أبانوب رأفت"
        subtitle="منذ ١٥ دقيقة"
        icon="notifications"
        variant="secondary"
      />
      <RecentUpdateCard
        title="عيد ميلاد اليوم: مارينا إياد"
        subtitle="لا تنسى تهنئتها!"
        icon="gift"
        variant="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
