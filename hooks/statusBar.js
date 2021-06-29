import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';

export default function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <>
      <View style={styles.appBar} />
      <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
      </View>
    </>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
