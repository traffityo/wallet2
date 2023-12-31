import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import ChangePinCodeScreen from '@screens/pincode/ChangePinCodeScreen';
import {AppState, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WalletDetailScreen from '@screens/wallet/WalletDetailScreen';
import WalletReceiveScreen from '@screens/wallet/WalletReceiveScreen';
import WalletSendScreen from '@screens/wallet/WalletSendScreen';
import WalletBuyScreen from '@screens/wallet/WalletBuyScreen';
import WalletTransactionScreen from '@screens/wallet/WalletTransactionScreen';
import WalletTransactionDetailScreen from '@screens/wallet/WalletTransactionDetailScreen';
import TokenScreen from '@screens/token/TokenScreen';
import BottomTabBarNavigator from '@modules/navigation/BottomTabBarNavigator';
import MarketDetailScreen from '@screens/market/MarketDetailScreen';
import {applicationProperties} from '@src/application.properties';
import SwapScreen from '@screens/swap/SwapScreen';
import SelectTokenScreen from '@screens/swap/SelectTokenScreen';
import LanguageScreen from '@screens/account/LanguageScreen';
import ConfirmPinCodeScreen from '@screens/pincode/ConfirmPinCodeScreen';

const Stack = createStackNavigator();

function MainStackNavigator() {
    const navigation = useNavigation();
    const [inBackground, setInBackground] = useState(false);
    const [lastDate, setLastDate] = useState(Date.now());
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            nextAppState => {
                try {
                    console.log(nextAppState);
                    if (nextAppState === 'active' && inBackground) {
                        setInBackground(false);
                        if (Platform.OS === 'android') {
                            const timeDiff = Date.now() - lastDate;
                            if (
                                timeDiff >
                                applicationProperties.pinAndroidTimeout * 1000
                            ) {
                                try {
                                    navigation.navigate('ChangePinCodeScreen');
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        } else {
                            try {
                                navigation.navigate('ChangePinCodeScreen');
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    } else if (nextAppState === 'background') {
                        setInBackground(true);
                        setLastDate(Date.now());
                    }
                } catch (error) {
                    setInBackground(false);
                    console.log(error);
                }
            },
        );

        return () => {
            subscription?.remove();
        };
    }, []);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
                name="BottomTabBarNavigator"
                component={BottomTabBarNavigator}
            />
            <Stack.Screen
                name="ReEnterPinCodeScreen"
                component={ChangePinCodeScreen}
            />
            <Stack.Screen
                name="WalletDetailScreen"
                component={WalletDetailScreen}
            />
            <Stack.Screen
                name="WalletReceiveScreen"
                component={WalletReceiveScreen}
            />
            <Stack.Screen
                name="WalletSendScreen"
                component={WalletSendScreen}
            />
            <Stack.Screen name="WalletBuyScreen" component={WalletBuyScreen} />
            <Stack.Screen
                name="WalletTransactionScreen"
                component={WalletTransactionScreen}
            />
            <Stack.Screen
                name="WalletTransactionDetailScreen"
                component={WalletTransactionDetailScreen}
            />
            <Stack.Screen name="TokenScreen" component={TokenScreen} />
            <Stack.Screen
                name="MarketDetailScreen"
                component={MarketDetailScreen}
            />
            <Stack.Screen name="SwapScreen" component={SwapScreen} />
            <Stack.Screen
                name="SelectTokenScreen"
                component={SelectTokenScreen}
            />
            <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
            <Stack.Screen
                name="ConfirmPinCodeScreen"
                component={ConfirmPinCodeScreen}
            />
            <Stack.Screen
                name="ChangePinCodeScreen"
                component={ChangePinCodeScreen}
            />
        </Stack.Navigator>
    );
}

export default MainStackNavigator;
