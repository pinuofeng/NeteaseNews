
import React, { PureComponent } from 'react';
import {
    BackHandler,
    InteractionManager,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import RouteConfigs from './app/RouteConfigs'
import StackNavigatorConfig from './app/StackNavigatorConfig'
import SplashScreen from 'react-native-splash-screen'
import CodePush from "react-native-code-push";
import './app/storage/store'


// 创建导航器，传入路由配置和导航配置
const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

class App extends PureComponent {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        this._closeStartPage();
        this._addBackListener();
        this._syncImmediate();
    }

    render() {

        let progressView;

        if (this.state.progress) {
            progressView = (
                <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
            );
        }

        {/*<View style={styles.container}>
            <TouchableOpacity onPress={this._sync}>
                <Text style={styles.syncButton}>后台更新</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._syncImmediate}>
                <Text style={styles.syncButton}>提示更新hahaha</Text>
            </TouchableOpacity>
            {progressView}
            <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
        </View>*/}

        return (
            <Navigator />
        );
    }

    // 处理android返回键事件，return true不执行返回，false执行返回操作
    // 单独组建里也可以用，用完要在组件销毁里removeEventListener
    _addBackListener = ()=>{
        BackHandler.addEventListener('hardwareBackPress', function() {
            let o = 1;
            if (o === 2) {
                alert('不退出1');
                return true;
            }
            return false;
        });
    };

    // 关闭启动页
    _closeStartPage = ()=>{
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
            });
        }, 1000);
    };


    // 更新状态
    _codePushStatusDidChange = syncStatus => {
        switch(syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({ syncMessage: "正在检查更新" });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ syncMessage: "正在下载安装包" });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({ syncMessage: "等待用户操作" });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ syncMessage: "安装更新包" });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({ syncMessage: "更新完成", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({ syncMessage: "用户取消更新", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ syncMessage: "安装和更新将在重启应用。", progress: false });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({ syncMessage: "发生错误", progress: false });
                break;
        }
    };

    // 更新进度
    _codePushDownloadDidProgress = progress => {
        this.setState({ progress });
    };

    // 后台静默更新
    _sync = () => {
        CodePush.sync(
            {},
            this._codePushStatusDidChange,
            this._codePushDownloadDidProgress
        );
    };

    // 弹出更新提示窗更新
    _syncImmediate = () => {
        CodePush.sync(
            {
                updateDialog: {
                    optionalIgnoreButtonLabel: '下次再说',
                    optionalInstallButtonLabel: '后台更新',
                    optionalUpdateMessage: '有新版本了，是否更新？',
                    title: '更新提示'
                },
                /**
                 * 三种更新的策略: 配置到installMode: 之后即可生效
                 * IMMEDIATE 下载完立即更新APP
                 * ON_NEXT_RESTART 到下一次启动应用时
                 * ON_NEXT_RESUME 当应用从后台返回时
                 */
                installMode: CodePush.InstallMode.ON_NEXT_RESTART,
            },
            this._codePushStatusDidChange,
            this._codePushDownloadDidProgress
        );
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 50
    },
    messages: {
        marginTop: 30,
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

App = CodePush(codePushOptions)(App);

export default App;