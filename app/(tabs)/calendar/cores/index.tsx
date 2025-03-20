import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCores } from '@/hooks/useCores';
import { format, parse } from 'date-fns';
import { getCoreTitle } from '@/model/CoreModel';

export default function CoresScreen() {
  const searchParams = useLocalSearchParams();
  const date = parse(searchParams.date as string, 'yyyy-MM-dd', new Date());

  const { data: originalCores } = useCores(date);
  const cores = originalCores?.sort((a, b) => a.core - b.core);

  function goToCore(core: number) {
    console.log(`${core}코어로 이동`);
    router.push({
      pathname: '/calendar/cores/[core]',
      params: { core: core, date: format(date, 'yyyy-MM-dd') },
    });
  }

  if (!cores) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>습관 데이터 로드 중...</Text>
      </View>
    );
  }

  const completed = cores.filter((h) => h.completed).length;
  const total = cores.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{format(date, 'yyyy년 M월 d일')}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.subtitle}>8가지 성공 습관</Text>
          <Text style={styles.stats}>
            완료: {completed}/{total}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.coresContainer}>
        {cores.map((core) => (
          <TouchableOpacity
            key={core.core}
            style={[styles.coreItem, core.completed && styles.coreItemCompleted]}
            onPress={() => goToCore(core.core)}
          >
            <View style={styles.coreInfo}>
              <Text style={styles.coreTitle}>{getCoreTitle(core.core)}</Text>
              {core.content && (
                <Text style={styles.coreDescription} numberOfLines={2}>
                  {core.content}
                </Text>
              )}
            </View>
            <View style={[styles.checkbox, core.completed && styles.checkboxChecked]}>
              {core.completed && <Text style={styles.checkmark}>✓</Text>}
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
  coresContainer: {
    flex: 1,
    padding: 15,
  },
  coreItem: {
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
  coreItemCompleted: {
    backgroundColor: '#f0f8ff',
  },
  coreInfo: {
    flex: 1,
  },
  coreTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  coreDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
