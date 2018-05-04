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
    ScrollView,
    Modal,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import ajax from './../../utils/fetch'
import HTMLView from 'react-native-htmlview'
import ImageViewer from 'react-native-image-zoom-viewer';
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
            isShowImgModal: false,
            statusBarTranslucent : true,
        };
    }

    // 设置默认输入参数
    static defaultProps = {

    };

    componentWillMount() {

        //测试取出Home组件里保存的用户信息
        storage.load({
            key: 'userInfo',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法

            console.log(ret.userName);

        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':

                    break;
                case 'ExpiredError':

                    break;
            }
        })

    }

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

    imgIndex = -1;
    imgArr = [];
    initIndex = 0;

    _renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name === 'img') {
            this.imgIndex++;
            let nodeAttr = node.attribs;
            let num = this.imgIndex;
            this.imgArr.push({url: nodeAttr.src});
            return (
                <TouchableOpacity key={index} activeOpacity={1} onPress={ ()=>{ this._showImgModal(num) } }>
                    <Image source={{uri: nodeAttr.src}} resizeMode={'stretch'} style={{flex: 1, height: this._getImgHeight(nodeAttr.src), marginBottom: 35 }} />
                </TouchableOpacity>
            );
        }
    };

    // 图片高度自适应
    _getImgHeight = (imageUri) => {
        let imgHeight = 230;
        Image.getSize(imageUri,(width,height) => {
            imgHeight = Math.floor(screenWidth/width*height);
        });
        return imgHeight
    };

    _showImgModal = (index) => {
        this.initIndex = index;
        this.setState({
            isShowImgModal: true,
            statusBarTranslucent: false
        });
    };

    _closeImgModal = () => {
        this.setState({
            isShowImgModal: false,
            statusBarTranslucent: true
        })
    };

    _onScroll = (event)=>{

        console.log(event.nativeEvent.contentOffset.y)

    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={ this.state.statusBarTranslucent }
                    backgroundColor={ this.state.statusBarTranslucent? '#d81e06': '#000' }
                />
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
                        saveToLocalByLongPress={false}
                        renderNode={this._renderNode}
                    />
                </ScrollView>

                {/* 图片Modal */}
                <Modal visible={this.state.isShowImgModal} transparent={false} onRequestClose={ this._closeImgModal }>
                    <ImageViewer index={this.initIndex} imageUrls={this.imgArr} onClick={ this._closeImgModal } />
                </Modal>

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