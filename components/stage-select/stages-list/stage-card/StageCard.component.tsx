import { IStage } from "@/constants/stages";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

export default function StageCard({ item }: { item: IStage }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { borderTopColor: item.color }]}
      onPress={() =>
        router.push({
          pathname: "/(selection)/class-select",
          params: { stageId: item.id, stageName: item.name },
        })
      }
      activeOpacity={0.8}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "15" }]}
      >
        <Ionicons name={item.icon as any} size={40} color={item.color} />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
      <Ionicons
        name="chevron-back-outline"
        size={16}
        color={colors.neutral[300]}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderTopWidth: 6,
    // Shadow للأندرويد والايفون
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardText: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
  },
  arrowIcon: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },
});
