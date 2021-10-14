import { ToastAndroid } from 'react-native';

const showToast = ({ message }) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export default showToast;
