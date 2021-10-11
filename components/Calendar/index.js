import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { subDays } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import TextInput from '../../components/AppTextInput';
import { formatedDate as Format } from '../../utils/formatedDate';

export default function DatePickerModal({ name, getDate }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState();

  const { setFieldValue, errors, touched } = useFormikContext();

  useEffect(() => {
    setCurrentDate(getDate);
    const formatedDate = Format(currentDate);

    setFieldValue(name, formatedDate);
    setDate(formatedDate);
  }, [currentDate, getDate, name, setFieldValue]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formatedDate = Format(subDays(new Date(date), 1));

    setFieldValue(name, formatedDate);
    setDate(formatedDate);
    hideDatePicker();
  };

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
        locale="pt_BR"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
