import { colors } from "@/styles/globals";
import { useCallback, useEffect, useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { IPickerColumnProps } from "./PickerColumn.types";

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
/** عدد العناصر الفاضية فوق وتحت عشان أول وآخر عنصر يقدروا يتوسّطوا */
const PADDING_ITEMS = 2;

export default function PickerColumn({
  label,
  items,
  selectedValue,
  onSelect,
  containerStyle,
}: IPickerColumnProps) {
  const scrollRef = useRef<ScrollView>(null);
  const selectedIndex = items.findIndex((item) => item.value === selectedValue);

  const scrollToSelected = useCallback(() => {
    scrollRef.current?.scrollTo({
      y: Math.max(selectedIndex, 0) * ITEM_HEIGHT,
      animated: false,
    });
  }, [selectedIndex]);

  useEffect(() => {
    scrollToSelected();
  }, [scrollToSelected]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.listWrapper}>
        <ScrollView
          ref={scrollRef}
          onLayout={scrollToSelected}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.content}
        >
          {items.map((item) => {
            const isSelected = item.value === selectedValue;

            return (
              <Pressable
                key={item.value}
                onPress={() => onSelect(item.value)}
                style={[styles.item, isSelected && styles.itemSelected]}
              >
                <Text
                  style={[styles.itemText, isSelected && styles.itemTextSelected]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
  label: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[500],
    marginBottom: 8,
  },
  listWrapper: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    paddingVertical: ITEM_HEIGHT * PADDING_ITEMS,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    borderRadius: 10,
  },
  itemSelected: {
    backgroundColor: colors.primary[900],
  },
  itemText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    color: colors.neutral[600],
  },
  itemTextSelected: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
