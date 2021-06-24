import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import { ListItem, SearchBar } from 'react-native-elements';
import { TouchableOpacity, Platform } from 'react-native';
import snapshotToArray from '../../utils/snapshotToArray';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Scroll, RemoveTag, ListContainer, RightIconHeader } from './styles';

export default function TagManager({ navigation }) {
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
  }, [uid]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddIncome')}
          style={RightIconHeader}
        >
          <MaterialCommunityIcons
            name="plus"
            size={Platform.OS === 'ios' ? 26 : 27}
            color="#333434"
          />
        </TouchableOpacity>
      ),
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
    </>
  );
}
