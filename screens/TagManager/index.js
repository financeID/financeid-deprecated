import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, View, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import showToast from '../../utils/toastAndroid';
import { auth } from '../../components/Firebase/firebase';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/colors';
import CreateNewTag from '../CreateNewTag';
import {
  LoadingContainer,
  Scroll,
  RemoveTag,
  ListContainer,
  ListTitleContainer,
  ListTitle,
  NothingHere,
  SearchBar,
  BorderBottom,
} from './styles';

export default function TagManager({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);

  const goto = route.params.goto;

  const { uid } = auth.currentUser;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tags')
      .where('userReference', '==', uid)
      .orderBy('name')
      .onSnapshot(querySnapshot => {
        let returnArr = [];

        querySnapshot.forEach(doc => {
          let item = doc.data();
          item.key = doc.id;

          returnArr.push(item);
        });

        setTags(returnArr);
        setData(returnArr);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [uid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CreateNewTag />,
    });
  }, [navigation]);

  const searchFilterFunction = text => {
    const newData = data.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setSearch(text);
    setTags(newData);
  };

  const buttonLink = l => {
    navigation.navigate(goto, { Tag: l.name });
  };

  const removeTag = key => {
    const tag = firebase.firestore().collection('tags').doc(key);

    tag.delete();

    Platform.OS === 'ios'
      ? showMessage({
          animationDuration: 500,
          message: 'Tag removida',
          backgroundColor: Colors.income,
          autoHide: true,
          position: 'bottom',
        })
      : showToast({
          message: 'Tag removida',
        });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </LoadingContainer>
      ) : (
        <>
          <View>
            <SearchBar
              placeholder="Procurar"
              onChangeText={text => searchFilterFunction(text)}
              value={search}
            />
          </View>

          {tags.length === 0 ? (
            data.length === 0 ? (
              <NothingHere>Não há nada por aqui</NothingHere>
            ) : (
              <NothingHere>Tag não encontrada</NothingHere>
            )
          ) : (
            <Scroll vertical keyboardShouldPersistTaps="always">
              {tags.map(tag => (
                <View key={tag.key}>
                  <ListContainer onPress={() => buttonLink(tag)}>
                    <ListTitleContainer>
                      <ListTitle>{tag.name}</ListTitle>
                    </ListTitleContainer>

                    <RemoveTag onPress={() => removeTag(tag.key)}>
                      <Ionicons
                        name="close-outline"
                        size={24}
                        color="#bdbdbd"
                      />
                    </RemoveTag>
                  </ListContainer>
                  <BorderBottom />
                </View>
              ))}
            </Scroll>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
