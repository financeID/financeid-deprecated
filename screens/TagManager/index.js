import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import { ListItem, SearchBar } from 'react-native-elements';
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
  NothingHere,
} from './styles';

export default function TagManager({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);

  const { uid } = auth.currentUser;

  useEffect(() => {
    const data = firebase.database().ref('users/' + uid + '/tags/');

    data.on('value', snapshot => {
      setTags(snapshotToArray(snapshot));
      setData(snapshotToArray(snapshot));
    });

    setLoading(false);
  }, [uid]);

  React.useLayoutEffect(() => {
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
    <>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </LoadingContainer>
      ) : (
        <>
          <SearchBar
            placeholder="Procurar"
            platform={'ios'}
            cancelButtonTitle=""
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
            }}
            autoFocus={true}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
          />

          {tags.length === 0 ? (
            data.length === 0 ? (
              <NothingHere>Não há nada por aqui</NothingHere>
            ) : (
              <NothingHere>Tag não encontrada</NothingHere>
            )
          ) : (
            <Scroll vertical keyboardShouldPersistTaps="always">
              {tags.map(tag => (
                <ListItem
                  containerStyle={ListContainer}
                  key={tag.key}
                  bottomDivider
                  onPress={() => buttonLink(tag)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{tag.name}</ListItem.Title>
                  </ListItem.Content>

                  <RemoveTag onPress={() => removeTag(tag.key)}>
                    <Ionicons name="close-outline" size={24} color="#bdbdbd" />
                  </RemoveTag>
                </ListItem>
              ))}
            </Scroll>
          )}
        </>
      )}
    </>
  );
}