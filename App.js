import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,FlatList,Modal,ImageBackground,TouchableNativeFeedback,Platform,
} from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [wordsList, setWordsList] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddButtonClick = () => {
    if (inputText.trim() !== '') {
      setWordsList([...wordsList, inputText]);
      setInputText('');
    }
  };

  const handleDeleteItem = (index) => {
    setDeleteIndex(index);
  };

  const confirmDeleteItem = () => {
    const updatedList = [...wordsList];
    updatedList.splice(deleteIndex, 1);
    setWordsList(updatedList);
    setDeleteIndex(null);
  };

  const cancelDeleteItem = () => {
    setDeleteIndex(null);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setInputText(wordsList[index]);
  };

  const handleEditItem = () => {
    if (editIndex !== null && inputText.trim() !== '') {
      const updatedList = [...wordsList];
      updatedList[editIndex] = inputText;
      setWordsList(updatedList);
      setEditIndex(null);
      setInputText('');
    }
  };

  const renderWordItem = ({ item, index }) => (
    <View style={styles.wordContainer}>
      <Text style={styles.wordText}>{item}</Text>
      <TouchableOpacity onPress={() => openEditModal(index)}>
        <Text style={styles.editButton}>✎</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteItem(index)}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddButton = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={handleAddButtonClick}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter</Text>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonClick}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ImageBackground
      source={require('./assets/fondecran.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Saisissez du texte ici"
        />
        {renderAddButton()}

        <FlatList
          style={styles.wordsContainer}
          data={wordsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderWordItem}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteIndex !== null}
          onRequestClose={() => cancelDeleteItem()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Êtes-vous sûr de vouloir supprimer cet élément ?</Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  onPress={() => cancelDeleteItem()}
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                >
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmDeleteItem()}
                  style={[styles.modalButton, { backgroundColor: 'blue' }]}
                >
                  <Text style={styles.modalButtonText}>Oui</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={editIndex !== null}
          onRequestClose={() => setEditIndex(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Modifier le texte :</Text>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder="Saisissez le nouveau texte"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity onPress={() => setEditIndex(null)} style={[styles.smallModalButton, { backgroundColor: 'red' }]}>
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditItem()} style={[styles.smallModalButton, { backgroundColor: 'green' }]}>
                  <Text style={styles.modalButtonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  editButton: {
    fontSize: 30,
    color: 'black',
    marginLeft: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  smallModalButton: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  wordsContainer: {
    marginTop: 20,
    maxHeight: 550,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, 
  },
  word: {
    fontSize: 18,
    color: '#333',
  },
  wordText: {
    fontSize: 18,
    color: '#333',
    backgroundColor: '#eee', 
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});