import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Alice', text: 'Bonjour, est-ce que votre appartement est toujours disponible ?' },
    { id: '2', sender: 'Vous', text: 'Oui, tout à fait.' },
    { id: '3', sender: 'Alice', text: 'Parfait, quand puis-je visiter ?' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'Vous', text: input.trim() }]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.chatMessage, item.sender === 'Vous' ? styles.chatSent : styles.chatReceived]}>
            <Text style={styles.chatSender}>{item.sender}</Text>
            <Text style={styles.chatText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{paddingVertical: 10}}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
          placeholder="Écrire un message..."
          style={styles.chatInput}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.chatSendBtn}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#e9f5f3',
    padding: 10,
  },
  chatMessage: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    elevation: 1,
  },
  chatSent: {
    backgroundColor: '#2a9d8f',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  chatReceived: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  chatSender: {
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 3,
  },
  chatText: {
    color: '#222',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 12,
  },
  chatSendBtn: {
    backgroundColor: '#2a9d8f',
    borderRadius: 24,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  }
});
