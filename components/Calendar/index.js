import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import TextInput from '../../components/AppTextInput';
import { formatedDate as Format } from '../../utils/formatedDate';

export default function DatePickerModal({ name }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const { setFieldValue, errors, touched } = useFormikContext();

  useEffect(() => {
    const formatedDate = Format();

    setFieldValue(name, formatedDate);
    setDate(formatedDate);
  }, [name, setFieldValue]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formatedDate = Format(date);

    setFieldValue(name, formatedDate);
    setDate(formatedDate);
    hideDatePicker();
  };

  /*const as = format(new Date(date), 'yyyy-MM-dd', {
    locale: pt,
  });*/

  //const dateTimeTranformed = as + new Date().toISOString().slice(10);

  return (
    <React.Fragment>
      <TextInput
        rightIcon="clock-outline"
        value={date}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        handlePasswordVisibility={showDatePicker}
        onChangeText={text => {
          setDate(text);
          setFieldValue(name, text);
        }}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
