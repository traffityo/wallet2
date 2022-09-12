import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CommonImage from '@components/commons/CommonImage';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import CarouselSlide from '@components/CarouselSlide';
import Icon, {Icons} from '@components/icons/Icons';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonText from '@components/commons/CommonText';
import {formatCoins, formatPrice} from '@src/utils/CurrencyUtil';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
    const {theme} = useSelector(state => state.ThemeReducer);
    const {wallets} = useSelector(state => state.WalletReducer);
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <LinearGradient
                colors={[theme.gradientPrimary, theme.gradientSecondary]}
                style={styles.gradient}>
                <View style={styles.header}>
                    <View>
                        <CommonImage
                            source={require('@assets/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <Icon type={Icons.Feather} name={'bell'} />
                </View>
                <View style={styles.carousel}>
                    <CarouselSlide />
                </View>
                <View style={styles.portfolioContainer}>
                    <View style={styles.portfolioHeader}>
                        <CommonText style={styles.portfolioTitle}>
                            Your Portfolios
                        </CommonText>
                        <CommonTouchableOpacity
                            onPress={() => {
                                navigation.navigate('TokenScreen');
                            }}>
                            <Icon
                                type={Icons.Feather}
                                name={'plus'}
                                style={{marginBottom: 10}}
                            />
                        </CommonTouchableOpacity>
                    </View>

                    <CommonFlatList
                        data={wallets}
                        keyExtractor={item => item.symbol}
                        renderItem={({item, index}) => {
                            return (
                                <LinearGradient
                                    colors={[
                                        theme.gradientSecondary,
                                        theme.gradientSecondary,
                                    ]}
                                    style={styles.item}>
                                    <View style={styles.itemInfo}>
                                        <CommonImage
                                            source={{uri: item.image}}
                                            style={styles.itemImg}
                                        />
                                        <View style={styles.itemDesc}>
                                            <CommonText style={styles.itemName}>
                                                {item.name}
                                            </CommonText>
                                            <CommonText
                                                style={[
                                                    styles.itemSymbol,
                                                    {color: theme.text2},
                                                ]}>
                                                {item.symbol}
                                            </CommonText>
                                        </View>
                                    </View>
                                    <View style={styles.itemPrice}>
                                        <View
                                            style={[
                                                styles.itemDesc,
                                                {alignItems: 'flex-end'},
                                            ]}>
                                            <CommonText style={styles.itemName}>
                                                {formatCoins(item.balance) +
                                                    ' ' +
                                                    item.symbol}
                                            </CommonText>
                                            <CommonText
                                                style={[
                                                    styles.itemSymbol,
                                                    {color: theme.text2},
                                                ]}>
                                                {formatPrice(item.value, true)}
                                            </CommonText>
                                        </View>
                                    </View>
                                </LinearGradient>
                            );
                        }}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gradient: {
        width: '100%',
        height: '100%',
    },
    header: {
        height: 52,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    carousel: {
        marginVertical: 20,
    },
    logo: {
        width: 32,
        height: 32,
    },
    portfolioContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    portfolioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        height: 80,
        width: '100%',
        backgroundColor: 'red',
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    itemImg: {
        width: 42,
        height: 42,
        borderRadius: 10000,
        backgroundColor: 'black',
    },
    itemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemDesc: {
        marginLeft: 10,
    },
    itemName: {
        fontWeight: 'bold',
    },
    itemSymbol: {
        fontSize: 12,
    },
    itemPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    portfolioHeader: {
        height: 38,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
