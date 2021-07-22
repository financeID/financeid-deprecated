import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { auth } from '../../components/Firebase/firebase';
import Form from '../../components/Forms/Form';
import Modal from 'react-native-modal';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import { Feather } from '@expo/vector-icons';
import MyStatusBar from '../../hooks/statusBar';
import Colors from '../../utils/colors';
import {
  Content,
  ModalContainer,
  Title,
  ContainerKeyboard,
  ViewButton,
  Header,
  AddTag,
  Chamfered,
  FilterContainer,
  TypeFilter,
  TextFilter,
  SaveFilter,
  SaveFilterText,
} from './styles';

function FilterTransactions({
  typeFilter,
  setTypeFilter,
  tagFilter,
  setTagFilter,
}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [type, setType] = useState(typeFilter);
  const [tag, setTag] = useState(tagFilter);

  const { uid } = auth.currentUser;

  useEffect(() => {
    firebase
      .firestore()
      .collection('tags')
      .where('userReference', '==', uid)
      .onSnapshot(querySnapshot => {
        let returnArr = [];

        querySnapshot.forEach(doc => {
          let item = doc.data();
          item.key = doc.id;

          returnArr.push(item);
        });

        setTags(returnArr);
      });
  }, [uid]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFilter = () => {
    setTypeFilter(type);
    setTagFilter(tag);
    setModalVisible(!isModalVisible);
  };

  const renderScrollable = GestureResponderHandlers => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...GestureResponderHandlers}
    />
  );

  return (
    <>
      <MyStatusBar backgroundColor="#f9f9fd" barStyle="dark-content" />
      <AddTag onPress={toggleModal}>
        <Feather
          name="sliders"
          size={22}
          color={
            type === null && tag === null ? Colors.primary : Colors.secondary
          }
        />
      </AddTag>

      <Modal
        scrollHorizontal
        propagateSwipe
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        swipeDirection="down"
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        style={ModalContainer}
      >
        <Form onSubmit={() => handleFilter()}>
          <Content>
            <Chamfered />
            <Header>
              <Title>Listar</Title>

              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <Feather name="x" size={24} />
              </TouchableOpacity>
            </Header>

            <FilterContainer>
              <TypeFilter
                onPress={() => setType(null)}
                type={type}
                model={null}
              >
                <TextFilter type={type} model={null}>
                  Todos
                </TextFilter>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('income')}
                type={type}
                model={'income'}
              >
                <TextFilter type={type} model={'income'}>
                  Entradas
                </TextFilter>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('outcome')}
                type={type}
                model={'outcome'}
              >
                <TextFilter type={type} model={'outcome'}>
                  Saídas
                </TextFilter>
              </TypeFilter>
            </FilterContainer>

            <View>
              <Title>
                Categoria {tag ? '-' : ''} {tag}
              </Title>
              <ScrollView
                horizontal
                onContentSizeChange={0}
                showsHorizontalScrollIndicator={false}
              >
                <TypeFilter
                  onPress={() => setTag(null)}
                  type={tag}
                  model={null}
                >
                  <Feather
                    name="x"
                    size={16}
                    color={tag === null ? '#ffffff' : '#000000'}
                    style={{ paddingRight: 2 }}
                  />
                  <TextFilter type={tag} model={null}>
                    Limpar
                  </TextFilter>
                </TypeFilter>
                {tags.map(t => (
                  <FilterContainer key={t.key}>
                    <TypeFilter
                      onPress={() => setTag(t.name)}
                      type={tag}
                      model={t.name}
                    >
                      <TextFilter type={tag} model={t.name}>
                        {t.name}
                      </TextFilter>
                    </TypeFilter>
                  </FilterContainer>
                ))}
              </ScrollView>
            </View>
          </Content>

          <ContainerKeyboard>
            <KeyboardAccessoryView
              renderScrollable={renderScrollable}
              style={{
                backgroundColor:
                  Platform.OS === 'ios' ? '#e7e6e6' : 'transparent',
              }}
            >
              <ViewButton>
                <SaveFilter onPress={() => handleFilter()}>
                  <SaveFilterText>Salvar</SaveFilterText>
                </SaveFilter>
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      </Modal>
    </>
  );
}

export default FilterTransactions;
