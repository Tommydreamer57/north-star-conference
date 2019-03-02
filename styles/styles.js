import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const Window = {
    height,
    width,
};

export const Colors = {
    green: "#C8C751",
    blueGreen: "#60A471",
    blue: "#00849B",
    yellow: "#44CC22",
    white: "#FFFFFF",
    black: "#000000",
};

export default StyleSheet.create({
    view: {
        backgroundColor: Colors.white,
        paddingTop: 24,
        paddingBottom: 48,
        paddingLeft: 18,
        paddingRight: 18,
        flex: 1,
        flexGrow: 1,
    },
    // large bold
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    // medium large bold blue
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.blue,
        marginBottom: 7,
    },
    // medium bold
    h3: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    // medium small italic
    h4: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 6,
    },
    // small
    text: {
        fontSize: 11,
        marginBottom: 5,
    },
    speakerphoto: {
        height: height / 3,
        width: width / 2,
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: Colors.black,
        borderWidth: 1,
    },
});
