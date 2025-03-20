import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// import { getCompletionStats, getHabitsForDate } from '@/storage/HabitStorage';
import { useHabits } from '@/hooks/useHabits';
import { parse } from 'date-fns';

export default function DetailScreen() {
  const searchParams = useLocalSearchParams();
  const date = parse(searchParams.date as string, 'yyyy-MM-dd', new Date());

  const { data: habits } = useHabits(date);

  console.log(habits);

  // 습관 상세 페이지로 이동
  const navigateToHabitDetail = (habitId: number) => {
    router.push({
      pathname: `/detail/habit/${habitId}`,
      params: { date: dateString },
    });
  };

  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString || typeof dateString !== 'string') return '날짜 선택';

    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  if (!habits) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2e64e5" />
        <Text style={{ marginTop: 10 }}>습관 데이터 로드 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.subtitle}>8가지 성공 습관</Text>
          <Text style={styles.stats}>{/*완료: {stats.completed}/{stats.total}*/}</Text>
        </View>
      </View>

      <ScrollView style={styles.habitsContainer}>
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.core}
            style={[styles.habitItem, habit.completed && styles.habitItemCompleted]}
            onPress={() => navigateToHabitDetail(habit.core)}
          >
            <View style={styles.habitInfo}>
              <Text style={styles.habitTitle}>아무튼 타이틀</Text>
              <Text style={styles.habitDescription}>아무튼 설명</Text>

              {/*{habit.notes ? (*/}
              {/*  <Text style={styles.habitNotes} numberOfLines={1} ellipsizeMode="tail">*/}
              {/*    {habit.notes}*/}
              {/*  </Text>*/}
              {/*) : null}*/}
            </View>
            <View style={[styles.checkbox, habit.completed && styles.checkboxChecked]}>
              {habit.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  stats: {
    fontSize: 14,
    color: '#2e64e5',
    fontWeight: '600',
  },
  habitsContainer: {
    flex: 1,
    padding: 15,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  habitItemCompleted: {
    backgroundColor: '#f0f8ff',
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  habitNotes: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    fontStyle: 'italic',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2e64e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2e64e5',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
  },
});
