import React from 'react';

import {
    Linking,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';

import {
    Icon,
} from 'expo';

const iconPrefix = Platform.OS !== "ios" ?
    "md-"
    :
    "ios-";

const links = [
    [
        {

            name: "SCHEDULE",
            to: "Schedule",
            // icon: "calendar",
            icon: "add-circle",
        },
        {

            name: "SESSIONS",
            to: "AllSessions",
            icon: "microphone",
        },
        {
            name: "FEEDBACK",
            to: "Feedback",
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
            url: "sms:770-530-1892",
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
            source={require('../assets/home-background.png')}
            style={styles.background}
        >
            <View
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
                                        size={50}
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
                                                    size={10}
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
            <View
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
        height: '33%',
    },
    links: {
        height: '50%',
        width: '100%',
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
        fontSize: 9,
        textAlign: 'center',
    },
});
