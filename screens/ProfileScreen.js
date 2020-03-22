import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: 'https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png' }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                   
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Points Earned</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>Redeem Rewards</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#13e2d4",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#13e2d4",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#13e2d4",
    },
});
