import { StyleSheet, Text, View } from "react-native";

export default function CalendarDetail() {
  return (
    <View style={styles.container}>
      <Text>캘린더 상세</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
