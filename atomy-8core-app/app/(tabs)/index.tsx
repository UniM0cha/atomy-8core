import { StyleSheet, View } from 'react-native';
import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';
import { router } from 'expo-router';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'kr';

export default function CalendarIndex() {
  function handleMonth(months: DateData[]) {
    console.log(months);
  }

  function handleDayPress(day: DateData) {
    console.log('선택한 날짜로 상세 화면 이동: ' + day.dateString);
    router.push({
      pathname: '/detail',
      params: { date: day.dateString },
    });
  }

  return (
    <View style={styles.container}>
      <CalendarList
        markedDates={{ '2025-03-06': { marked: true, dotColor: 'gray' }, '2025-03-07': { marked: true } }}
        onVisibleMonthsChange={handleMonth}
        onDayPress={handleDayPress}
        markingType="dot"
        monthFormat="yyyy년 MM월"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
