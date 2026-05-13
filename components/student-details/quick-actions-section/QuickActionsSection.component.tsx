import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuickActionsSection({
  phone,
  location,
}: {
  phone: string;
  location: string;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => Linking.openURL(`tel:${phone}`)}
      >
        <View style={[styles.iconCircle, { backgroundColor: "#E1F5FE" }]}>
          <Ionicons name="call" size={22} color="#0288D1" />
        </View>
        <Text style={styles.actionText}>اتصال</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => Linking.openURL(`whatsapp://send?phone=+2${phone}`)}
      >
        <View style={[styles.iconCircle, { backgroundColor: "#E8F5E9" }]}>
          <FontAwesome5 name="whatsapp" size={22} color="#2E7D32" />
        </View>
        <Text style={styles.actionText}>واتساب</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
          <Ionicons name="location" size={22} color="#EF6C00" />
        </View>
        <Text style={styles.actionText}>الموقع</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionBtn: { alignItems: "center", gap: 8 },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
});
