import { colors } from "@/styles/globals";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function FooterSection() {
  return (
    <View style={styles.footerContainer}>
      <ImageBackground
        source={require("../../../assets/images/church.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.verseText}>
            ”مَنْ كَانَ يَخْدِمُنِي فَلْيَتْبَعْنِي، وَحَيْثُ أَكُونُ أَنَا
            هُنَاكَ أَيْضًا يَكُونُ خَادِمِي. وَمَنْ كَانَ يَخْدِمُنِي
            فَسَيُكْرِمُهُ الآبُ“
          </Text>
          <Text style={styles.verseRef}>يوحنا ١٢:٢٦</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 180,
    marginTop: 20,
    marginBottom: 40,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  verseText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Tajawal",
    textAlign: "center",
    lineHeight: 24,
    fontStyle: "italic",
  },
  verseRef: {
    color: colors.primary[200],
    fontSize: 14,
    fontFamily: "Tajawal",
    marginTop: 10,
    fontWeight: "bold",
  },
});
