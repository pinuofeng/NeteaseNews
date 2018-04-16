/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react'
import {
    Image,
    StyleSheet
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import Home from './pages/Home'
import Video from './pages/Video'
import Live from './pages/Live'
import Mine from './pages/Mine'

export default class MianTab extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '首页'
        }
    }

    render(){
        return (
            <TabNavigator>
                { this._renderTabarItems('首页', require("./../assets/images/i_home.png"), require("./../assets/images/i_home_foc.png"), Home) }
                { this._renderTabarItems('视频', require("./../assets/images/i_video.png"), require("./../assets/images/i_video_foc.png"), Video) }
                { this._renderTabarItems('直播', require("./../assets/images/i_live.png"), require("./../assets/images/i_live_foc.png"), Live) }
                { this._renderTabarItems('我的', require("./../assets/images/i_mine.png"), require("./../assets/images/i_mine_foc.png"), Mine) }
            </TabNavigator>
        );
    }

    _renderTabarItems(selectedTab,icon,selectedIcon,Component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: selectedTab })}
            >
                <Component navigation={ this.props.navigation } />
            </TabNavigator.Item>
        )

    }

}

const styles = StyleSheet.create({
    tabText:{
        color:'#515151',
        fontSize:12
    },
    selectedTabText:{
        color:'#d81e06'
    },
    icon:{
        width:25,
        height:25,
        marginBottom: -3
    }
});
