import React, { useState } from 'react';
import { Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Container, ViewContent, modal, TagContainer, TagText } from './styles';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  //const searchBarDefualt = Platform.OS === 'ios' ? 'ios' : 'android';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const items = [
    { label: 'Viagem' },
    { label: 'Educação' },
    { label: 'Casa' },
    { label: 'Auto' },
  ];

  return (
    <Container>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        useNativeDriverForBackdrop
        backdropColor="transparent"
        style={modal.view}
      >
        <ViewContent>
          <SearchBar
            placeholder="Digite uma tag"
            platform={'ios'}
            cancelButtonTitle=""
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
            }}
            inputContainerStyle={{
              backgroundColor: '#f8f8ff',
            }}
            autoFocus={true}
            onChangeText={text => setSearch(text)}
            value={search}
          />

          <TagContainer
            vertical
            onContentSizeChange={0}
            showsHorizontalScrollIndicator={false}
          >
            {items.map(item => {
              return <TagText key={item.label}>{item.label}</TagText>;
            })}
          </TagContainer>
        </ViewContent>
      </Modal>
    </Container>
  );
}

export default ModalTester;
