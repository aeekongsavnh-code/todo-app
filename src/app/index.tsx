import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, StatusBar
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', text: 'ຮຽນ React Native', done: false },
    { id: '2', text: 'ສ້າງ Portfolio', done: false },
  ]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, done: false }]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>📝 Todo List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="ເພີ່ມວຽກໃໝ່..."
          placeholderTextColor="#888"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskLeft}>
              <Text style={styles.checkbox}>{item.done ? '✅' : '⬜'}</Text>
              <Text style={[styles.taskText, item.done && styles.done]}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.count}>
        ທັງໝົດ: {tasks.length} | ສຳເລັດ: {tasks.filter(t => t.done).length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#e94560', marginBottom: 24, textAlign: 'center' },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#16213e', color: '#fff', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginRight: 10 },
  addBtn: { backgroundColor: '#e94560', borderRadius: 12, width: 50, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  taskRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e', borderRadius: 12, padding: 14, marginBottom: 10, justifyContent: 'space-between' },
  taskLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: { fontSize: 20, marginRight: 10 },
  taskText: { fontSize: 16, color: '#fff', flex: 1 },
  done: { textDecorationLine: 'line-through', color: '#888' },
  delete: { fontSize: 20 },
  count: { textAlign: 'center', color: '#888', marginTop: 10, marginBottom: 20, fontSize: 14 },
});
