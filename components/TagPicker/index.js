import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';

export default function TagPicker({ navigation, name, tag, placeholder }) {
  const { setFieldValue, errors, touched } = useFormikContext();

  useEffect(() => {
    const setTag = tag ? tag : null;

    setFieldValue(name, setTag);
  }, [setFieldValue, name, tag]);

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('TagManager')}
      >
        <Text style={styles.input}>
          {tag ? tag : <Text style={{ color: 'grey' }}>{placeholder}</Text>}
        </Text>

        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="tag-outline"
            size={20}
            color={'#6e6869'}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 0,
    flex: 1,
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 7,
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 19 : 16,
    lineHeight: 26,
    color: '#000',
  },
  button: {
    flex: 1,
  },
});
