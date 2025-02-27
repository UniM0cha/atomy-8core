import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";

export default function CalendarIndex() {
  function handleMonth(months: DateData[]) {
    console.log(months);
  }

  return (
    <View style={styles.container}>
      <CalendarList onVisibleMonthsChange={handleMonth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
