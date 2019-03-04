import React from 'react';

import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

import createNavigationOptions from '../navigation/navigation-options';

Map.navigationOptions = createNavigationOptions("Map");

export default function Map() {
    return (
        // <View>
        //     <Text>BEFORE</Text>
        <Image
            source={require('../assets/Map.png')}
            style={styles.background}
        />
        //     <Text>AFTER</Text>
        // </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
    },
});
