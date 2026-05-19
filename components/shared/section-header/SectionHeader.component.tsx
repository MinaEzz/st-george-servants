import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ISectionHeaderProps from "./SectionHeader.types";

export default function SectionHeader({
  title,
  icon,
  viewAllHref,
}: ISectionHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.titleContainer}>
        {icon &&
          React.cloneElement(icon, { size: 24, color: colors.primary[900] })}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {viewAllHref && (
        <TouchableOpacity onPress={() => router.push(viewAllHref)}>
          <Text style={styles.viewAll}>عرض الكل</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  viewAll: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.secondary[600],
  },
});
