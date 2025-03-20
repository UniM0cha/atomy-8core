import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Habit } from '@/storage/types';

export default function HabitDetail() {
  const { id, date } = useLocalSearchParams();
  const habitId = typeof id === 'string' ? parseInt(id, 10) : 0;
  const dateString = date as string;

  const [habit, setHabit] = useState<Habit | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // // 습관 데이터 가져오기
  // useEffect(() => {
  //   const loadHabit = async () => {
  //     try {
  //       setLoading(true);
  //
  //       // 기본 습관 정보 가져오기
  //       const defaultHabit = DEFAULT_HABITS.find((h) => h.id === habitId);
  //       if (!defaultHabit) {
  //         Alert.alert('오류', '습관 정보를 찾을 수 없습니다.');
  //         router.back();
  //         return;
  //       }
  //
  //       // 저장된 습관 기록 조회
  //       const habit = await getHabitByIdForDate(dateString, habitId);
  //
  //       if (habit) {
  //         // 기록이 있으면 해당 정보 사용
  //         setHabit(habit);
  //         setNotes(habit.notes || '');
  //       } else {
  //         // 기록이 없으면 기본 습관 정보 사용
  //         setHabit(defaultHabit);
  //         setNotes('');
  //       }
  //     } catch (error) {
  //       console.error('Error loading habit:', error);
  //       Alert.alert('오류', '습관 정보를 불러오는 중 오류가 발생했습니다.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   loadHabit();
  // }, [habitId, dateString]);

  // // 저장 및 완료 처리
  // const handleSave = async () => {
  //   if (!habit) return;
  //
  //   try {
  //     setSaving(true);
  //
  //     // 습관 정보 저장
  //     await saveHabit(
  //       dateString,
  //       habitId,
  //       true, // 완료 상태로 저장
  //       notes,
  //     );
  //
  //     // 저장 성공 안내
  //     Alert.alert('저장 완료', '습관 정보가 저장되었습니다.', [{ text: '확인', onPress: () => router.back() }]);
  //   } catch (error) {
  //     console.error('Error saving habit:', error);
  //     Alert.alert('오류', '저장 중 오류가 발생했습니다.');
  //     setSaving(false);
  //   }
  // };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2e64e5" />
        <Text style={{ marginTop: 10 }}>습관 정보 로드 중...</Text>
      </View>
    );
  }

  if (!habit) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>습관 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  // 이름 형식화 (습관 이름이 짧으면 부연 설명 추가)
  // const habitTitle = habit.name.length < 4 && habit.description ? `${habit.name} (${habit.description})` : habit.name;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/*<View style={styles.header}>*/}
        {/*  <Text style={styles.headerText}>{habitTitle}</Text>*/}
        {/*  {habit.name.length >= 4 && habit.description ? (*/}
        {/*    <Text style={styles.description}>{habit.description}</Text>*/}
        {/*  ) : null}*/}
        {/*</View>*/}

        <View style={styles.form}>
          <Text style={styles.label}>메모</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="이 습관에 대한 메모를 입력하세요..."
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
            editable={!saving}
          />

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>날짜:</Text>
            <Text style={styles.dateValue}>{dateString}</Text>
          </View>

          {habit.completed ? (
            <View style={styles.completedInfo}>
              <Text style={styles.completedText}>✓ 이미 완료된 습관입니다</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          // onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>{habit.completed ? '다시 저장하기' : '저장 및 완료'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 150,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  dateValue: {
    fontSize: 16,
    color: '#666',
  },
  completedInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  completedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  saveButtonDisabled: {
    backgroundColor: '#9eb6e3',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
