import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';

export default function ConfigScreen() {
    useStatusBar('dark-content');
    return (
        <View style={styles.container}>
            <Text>ConfigScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
