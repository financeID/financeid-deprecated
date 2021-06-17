import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Modal from 'react-native-modal';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const searchBarDefualt = Platform.OS === 'ios' ? 'ios' : 'android';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const items = [{ label: 'Viagem' }, { label: 'Educação' }, { label: 'Casa' }];

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        useNativeDriverForBackdrop
        customBackdrop={null}
        swipeDirection={['down']}
        style={styles.view}
      >
        <View style={styles.content}>
          <SearchBar
            placeholder="Type Here..."
            platform={searchBarDefualt}
            cancelButtonTitle="Cancelar"
            containerStyle={{
              backgroundColor: '#fff',
              borderBottomColor: 'transparent',
            }}
            autoFocus={true}
            onChangeText={text => setSearch(text)}
            value={search}
          />

          {items.map(item => {
            return <Text key={item.label}>{item.label}</Text>;
          })}

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
    height: '100%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default ModalTester;
