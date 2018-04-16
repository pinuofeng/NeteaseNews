/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import ajax from './../../utils/fetch'
import HTMLView from 'react-native-htmlview';
import Toast, {DURATION} from 'react-native-easy-toast'
import Header from './../../components/Header'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default class NewsDetail extends PureComponent{

    // 构造器
    constructor(props){
        super(props);
        this.state = {
            newsData: '',
            body: '',
        };
    }

    // 设置默认输入参数
    static defaultProps = {

    };

    // 渲染完成钩子
    componentDidMount() {
        this._getNewsDetailData();
    }

    _getNewsDetailData(){

        let _this = this;
        let docid = this.props.navigation.state.params.item.docid;

        ajax({
            url: `http://c.m.163.com/nc/article/${docid}/full.html`,
            success: (data)=>{
                let body = data[docid].body;
                data[docid]['img'].forEach(item =>{
                    body = body.replace(item.ref, `<img src="${item.src}" />`);
                });
                _this.setState({
                    newsData: data[docid],
                    body: body
                });
            },
            error: (err)=>{
                console.info('详情请求错误:');
                console.info(err);
            }
        });

    }

    _renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name === 'img') {
            const a = node.attribs;
            return (
                <Image source={{uri:a.src}} key={index} resizeMode={'stretch'} style={{flex: 1, height: 230, marginBottom: 35 }} />
            );
        }
    }

    _onScroll = (event)=>{

        console.log(event.nativeEvent.contentOffset.y)

    };

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <ScrollView
                    //scrollEventThrottle={200}
                    //onScroll={this._onScroll}
                >
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#2c2c2c', marginBottom: 10, lineHeight: 35}}>{this.state.newsData.title}</Text>
                        <Text>{this.state.newsData.source}  {this.state.newsData.ptime}</Text>
                    </View>
                    <HTMLView
                        value={this.state.body}
                        onLinkPress={(url) => alert('clicked link: ', url)}
                        stylesheet={htmlStyles}
                        style={{padding: 10}}
                        renderNode={this._renderNode}
                    />
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },


});

const htmlStyles = StyleSheet.create({

    p: {
        color: '#2c2c2c',
        lineHeight: 30,
        fontSize:16
    }

});