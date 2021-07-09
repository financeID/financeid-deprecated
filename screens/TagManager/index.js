import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import { ActivityIndicator } from 'react-native';
import snapshotToArray from '../../utils/snapshotToArray';
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

export default function TagManager({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);

  const { uid } = auth.currentUser;

  useEffect(() => {
    const data = firebase.database().ref('users/' + uid + '/tags/');

    data.orderByChild('value').on('value', snapshot => {
      setTags(snapshotToArray(snapshot));
      setData(snapshotToArray(snapshot));
      setLoading(false);
    });
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
    navigation.navigate('AddIncome', { Tag: l.name });
  };

  const removeTag = key => {
    const tag = firebase.database().ref('users/' + uid + '/tags/' + key);

    tag.remove();
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
              autoFocus={true}
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
                <>
                  <ListContainer key={tag.key} onPress={() => buttonLink(tag)}>
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
                </>
              ))}
            </Scroll>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
