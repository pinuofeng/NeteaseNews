
import React, { PureComponent } from 'react';
import { BackHandler, InteractionManager } from 'react-native'
import { StackNavigator } from 'react-navigation';
import RouteConfigs from './app/RouteConfigs'
import StackNavigatorConfig from './app/StackNavigatorConfig'
import SplashScreen from 'react-native-splash-screen'
import './app/storage/store'


// 创建导航器，传入路由配置和导航配置
const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class App extends PureComponent {

    componentWillMount() {
        // 处理android返回键事件，return true不执行返回，false执行返回操作
        // 单独组建里也可以用，用完要在组件销毁里removeEventListener
        BackHandler.addEventListener('hardwareBackPress', function() {
            let o = 1;
            if (o === 2) {
                alert('不退出1');
                return true;
            }
            return false;
        });

        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
            });
        }, 1000);


    }

    render() {
        return (
            <Navigator />
        );
    }
}