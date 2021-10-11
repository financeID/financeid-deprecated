import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import { ButtonContainer, Input, Icon, PlaceHolder, Line } from './styles';

export default function TagPicker({
  navigation,
  name,
  tag,
  placeholder,
  goTo,
}) {
  const [currentTag, setCurrentTag] = useState();
  const { setFieldValue, errors, touched } = useFormikContext();

  useEffect(() => {
    setCurrentTag(tag);
    const setTag = currentTag ? currentTag : null;

    setFieldValue(name, setTag);
  }, [setFieldValue, name, tag, currentTag]);

  return (
    <React.Fragment>
      <ButtonContainer
        onPress={() => navigation.navigate('TagManager', { goto: goTo })}
      >
        <Input>{tag ? tag : <PlaceHolder>{placeholder}</PlaceHolder>}</Input>

        <Icon>
          <MaterialCommunityIcons
            name="tag-outline"
            size={20}
            color={'#6e6869'}
          />
        </Icon>
      </ButtonContainer>
      <Line />

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
