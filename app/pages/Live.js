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
    TouchableOpacity
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

const { width, height } = Dimensions.get('window');

export default class Live extends PureComponent{

    // 构造器
    constructor(props){
        super(props);
        this.state = {
            isShow: true,
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

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    }


});