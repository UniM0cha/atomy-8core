import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function CalendarIndex() {
  const router = useRouter();

  const goToDetail = () => {
    router.push("/detail");
  };

  return (
    <View style={styles.container}>
      <Text>캘린더 메인 페이지</Text>
      <TouchableOpacity style={styles.button} onPress={goToDetail}>
        <Text style={styles.buttonText}>상세 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
