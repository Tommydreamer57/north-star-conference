import React from 'react';

import {
    Linking,
    ImageBackground,
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';

import { Icon } from 'expo';

import { Window, SIZES } from '../styles/styles';

export const iconPrefix = Platform.OS === "ios" ?
    "ios-"
    :
    "md-";

const links = [
    [
        {
            name: "SCHEDULE",
            to: "Schedule",
            icon: "add-circle",
        },
        {
            name: "SESSIONS",
            to: "AllSessions",
            icon: "microphone",
        },
        {
            name: "FEEDBACK",
            to: "FeedbackSelect",
            icon: "paper",
        },
    ],
    [
        {
            name: "SPEAKERS",
            to: "AllSpeakers",
            icon: "people",
        },
        {
            name: "MAP",
            to: "Map",
            icon: "map",
        },
        {
            name: "NOTIFICATIONS",
            to: "Notifications",
            icon: "notifications",
        },
    ],
    [
        {
            name: "AUDIO",
            url: "https://vimeo.com/ondemand/northstar2018/256616872",
            icon: "play-circle",
        },
        {
            name: "CONTACT",
            url: "sms:435-612-2474",
            icon: "text",
        },
        {
            name: "DONATE",
            url: "https://northstarlds.org/give/donate/",
            icon: "cash",
        },
    ],
];

Home.navigationOptions = {
    header: null,
};

export default function Home({
    navigation: {
        navigate,
    },
}) {
    return (
        <ImageBackground
            source={require('../assets/BKGD.png')}
            style={styles.background}
        >
            <Image
                source={require('../assets/LogoTop.png')}
                style={styles.topPadding}
            />
            <View
                style={styles.links}
            >
                {links.map((row, i) => (
                    <View
                        key={i}
                        style={styles.row}
                    >
                        {row.map(({
                            to,
                            icon,
                            name,
                            url,
                        }, j) => (
                                <TouchableOpacity
                                    key={j}
                                    style={styles.touchable}
                                    onPress={to ?
                                        () => navigate(to)
                                        :
                                        () => Linking.canOpenURL(url) ?
                                            Linking.openURL(url)
                                            :
                                            console.log(`Cannot open url: ${url}`)}
                                >
                                    <Icon.Ionicons
                                        name={iconPrefix + icon}
                                        size={SIZES.homeIcon}
                                        color='white'
                                    // style={styles.icon}
                                    />
                                    <Text
                                        style={styles.text}
                                    >
                                        {name}
                                        {!to && url && Linking.canOpenURL(url) ? (
                                            <>
                                                &nbsp;
                                                <Icon.Ionicons
                                                    name={iconPrefix + "open"}
                                                    size={SIZES.small - 1}
                                                    color="white"
                                                />
                                            </>
                                        ) : null}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                ))}
            </View>
            <Image
                source={require('../assets/LogoBottom.png')}
                style={styles.bottomPadding}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    topPadding: {
        resizeMode: 'contain',
        width: Window.width * 0.8,
        marginLeft: Window.width * 0.1,
        marginRight: Window.width * 0.1,
        marginTop: Window.height * 0.03,
        height: Window.height * 0.3,
    },
    bottomPadding: {
        resizeMode: 'contain',
        width: Window.width * 0.5,
        height: Window.height * 0.17,
        marginLeft: Window.width * 0.25,
        marginRight: Window.width * 0.25,
        marginTop: 0,
    },
    links: {
        height: Window.height * 0.5,
        width: Window.width,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: SIZES.small - 1,
        textAlign: 'center',
    },
});
