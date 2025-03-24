import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCore } from '@/hooks/useCores';
import { parse } from 'date-fns';
import { useFormik } from 'formik';
import { Core } from '@/storage/types';
import { getCoreTitle, getCoreDescription } from '@/model/CoreModel';
import { useEffect, useState } from 'react';
import { Colors } from '@/constant/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoreScreen() {
  const navigation = useNavigation();
  const searchParams = useLocalSearchParams();
  const date = parse(searchParams.date as string, 'yyyy-MM-dd', new Date());
  const core = Number(searchParams.core as string);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // title 지정
  useEffect(() => {
    navigation.setOptions({ title: getCoreTitle(core) });
  }, [core, navigation]);

  const { data: coreData } = useCore(date, core);

  const { values, setValues, isSubmitting, submitForm } = useFormik({
    initialValues: new Values(coreData),
    onSubmit: handleFormikSubmit,
    enableReinitialize: true,
  });

  async function handleFormikSubmit(values: Values) {}

  async function handleContentChange(content: string) {
    await setValues((values) => ({ ...values, content }));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>내용</Text>
            <TouchableOpacity onPress={() => setIsFullScreen(true)}>
              <MaterialIcons name="open-in-full" size={18} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={10}
            placeholder="이 습관에 대한 내용을 입력하세요..."
            value={values.content}
            onChangeText={handleContentChange}
            textAlignVertical="top"
            editable={!isSubmitting}
          />

          {values.completed ? (
            <View style={styles.completedInfo}>
              <Text style={styles.completedText}>✓ 이미 완료된 습관입니다</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
          onPress={submitForm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>{values.completed ? '다시 저장하기' : '저장 및 완료'}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.coreDescription} numberOfLines={undefined} ellipsizeMode="tail">
          {getCoreDescription(core)}
        </Text>
      </ScrollView>

      <Modal visible={isFullScreen} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>내용 작성</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFullScreen(false)}>
            <Text style={styles.closeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.fullScreenInput}
          multiline
          placeholder="이 습관에 대한 내용을 입력하세요..."
          value={values.content}
          onChangeText={handleContentChange}
          textAlignVertical="top"
          editable={!isSubmitting}
        />
      </Modal>
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
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingRight: 40,
    fontSize: 16,
    height: 240,
    textAlignVertical: 'top',
    marginTop: 5,
    marginBottom: 10,
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
    backgroundColor: Colors.primary,
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
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  coreDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 40,
  },
  fullScreenInput: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});

class Values {
  completed: boolean;
  content: string;

  constructor(core?: Core) {
    this.completed = core?.completed || false;
    this.content = core?.content || '';
  }
}
