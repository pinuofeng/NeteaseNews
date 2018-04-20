
/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Easing
} from 'react-native';

import {
    Button,
    Avatar,
    Badge,
    CheckBox,
    Header,
    Icon,
    Rating
} from 'react-native-elements';

import Modal from 'react-native-modalbox';

const {width: screenW, height: screenH } = Dimensions.get('window');


class Child extends PureComponent{

    // 构造器
    constructor(props){
        super(props);
        this.state = {
            isShow: true,
        };
    }

    _changeState = ()=>{
        this.setState({isShow: !this.state.isShow});
    };

    render(){
        return (
            this.state.isShow
                ? <View style={{marginBottom: 20}}><Text>我是子组件</Text><Button title="子Btn也可以控制显示隐藏" onPress={()=>{ this.setState({isShow: !this.state.isShow}) }}/></View>
                : null
        )
    }

}

export default class Live extends PureComponent{

    // 构造器
    constructor(props){
        super(props);
        this.state = {
            isShow: true,
            isOpen: false
        };
    }

    _leftComponent = ()=>{
        return (
            <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{alert('返回')}}>
                <Icon
                    name='angle-left'
                    type='font-awesome'
                    color='#fff'
                    iconStyle={{marginRight: 10}}
                    size={30}
                />
                <Text style={{color: '#fff', fontSize: 15}}>返回</Text>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.container}>

                <Header
                    leftComponent={this._leftComponent()}
                    centerComponent={{ text: '直播', style: { color: '#fff', fontSize: 18 } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Child ref="childComponent" />
                <Button title="显示/隐藏" onPress={()=>{this.refs['childComponent']._changeState()}}/>


                <Icon
                    name='heartbeat'
                    type='font-awesome'
                    color='#517fa4'
                    onPress={() => console.log('hello')}
                />

                <Avatar
                    large
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
                    onPress={()=>{alert('hello')}}
                    activeOpacity={0.7}
                />


                {
                    this.state.isShow && <Rating showRating fractions={1} startingValue={3.3} />
                }


                <Button
                    title={'按钮'}
                    color={'red'}
                    loading={true}
                    rightIcon={{name: 'facebook', size: 20, type: 'font-awesome', color: 'blue'}}
                    buttonStyle={{backgroundColor: 'green', width: 170, height: 40, borderRadius: 10, }}
                    onPress={()=>{
                        this.setState({isShow: !this.state.isShow});
                    }}
                />


                <Button
                    title={'购买'}
                    buttonStyle={{ width: 170, height: 40, borderRadius: 10, }}
                    onPress={()=>{
                        this.setState({isOpen: !this.state.isOpen});
                    }}
                />

                {/* 滑动弹窗 */}
                <Modal
                    ref={"modal"}
                    style={styles.modal}
                    isOpen={this.state.isOpen}
                    onOpened={() => {}}
                    onClosed={() => this.setState({isOpen: false})}
                    position={"bottom"}
                    swipeToClose={false}
                    easing={Easing.elastic(0)}
                    animationDuration={250}
                    backButtonClose // android下按返回键关闭
                >
                    <TouchableOpacity style={styles.closeBtn} activeOpacity={1} onPress={()=> this.setState({isOpen: !this.state.isOpen})}>
                        <Text>X</Text>
                    </TouchableOpacity>
                </Modal>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    modal: {
        height: 400,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    closeBtn: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRadius: 15,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    }


});