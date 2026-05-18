import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import StudentCard from "@/components/students/students-list/student-card/StudentCard.component";
import { STUDENTS_FILTERS } from "@/constants";
import { STUDENTS } from "@/constants/students";
import { colors, globalStyles } from "@/styles/globals";
import { todayDate } from "@/utils/todayData";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(STUDENTS_FILTERS[0].value);
  const today = todayDate();
  const router = useRouter();

  return (
    <View style={[globalStyles.container, { position: "relative" }]}>
      <View style={globalStyles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>مرحلة ابتدائي</Text>
        </View>
        <Text style={styles.title}>قائمة مخدومين الفصل الثاني</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.followUpCard]}>
          <Text style={[styles.statNumber, { color: "#F44336" }]}>14</Text>
          <Text style={styles.statLabel}>يحتاجون متابعة</Text>
        </View>

        <View style={[styles.statCard, styles.totalCard]}>
          <Text style={[styles.statNumber, { color: colors.primary[900] }]}>
            155
          </Text>
          <Text style={styles.statLabel}>إجمالي المخدومين</Text>
        </View>
      </View>

      <Searchbar value={searchQuery} onChange={setSearchQuery} />

      <View style={styles.filterWrapper}>
        <FlatList
          data={STUDENTS_FILTERS}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted
          contentContainerStyle={styles.filterScroll}
          renderItem={({ item }) => {
            const isActive = item.value === filter;
            return (
              <TouchableOpacity
                onPress={() => setFilter(item.value)}
                style={[
                  styles.filterBadge,
                  isActive && styles.activeFilterBadge,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.activeFilterText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={STUDENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StudentCard student={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-sharp"
              size={48}
              color={colors.neutral[300]}
            />
            <Text style={styles.emptyText}>لا يوجد مخدومين يطابقون البحث</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/students/add-student")}
        activeOpacity={0.8}
      >
        <Ionicons name="person-add-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.primary[900],
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: "#fff", fontFamily: "Tajawal", fontSize: 12 },
  title: {
    fontFamily: "Tajawal",
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary[900],
    textAlign: "right",
    marginTop: 10,
  },
  date: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: "right",
  },

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    height: 90,
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  totalCard: { backgroundColor: "#fff" },
  followUpCard: { backgroundColor: "#FFEBEE" },
  statNumber: { fontFamily: "Tajawal", fontSize: 24, fontWeight: "bold" },
  statLabel: {
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[600],
    marginTop: 2,
  },
  filterWrapper: { marginBottom: 15, marginRight: -24, marginLeft: -24 },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  activeFilterBadge: {
    backgroundColor: colors.primary[900],
    borderColor: colors.primary[900],
  },
  filterText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[600],
  },
  activeFilterText: { color: "#fff", fontWeight: "bold" },

  listContent: { paddingBottom: 100, paddingTop: 5 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 10,
  },
  emptyText: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[400],
  },

  fab: {
    position: "absolute",
    bottom: 25,
    left: 20,
    backgroundColor: colors.primary[900],
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
