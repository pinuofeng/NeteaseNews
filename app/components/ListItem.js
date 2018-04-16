/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export default class ListItem extends PureComponent{

    // 设置默认输入参数
    static defaultProps = {
        leftText: '',
        rightText: '',
        isShowUnderline: true,
        isShowArrow: true
    };

    _renderRight = () => {

        if(!this.props.rightText && !this.props.rightComponent){
            return <Text />
        }

        if(this.props.rightText){
            return (
                <Text style={styles.rightText}>
                    {this.props.rightText}
                </Text>
            )
        }

        if(this.props.rightComponent){
            return (
                <this.props.rightComponent />
            )
        }

    };

    render() {
        return (
            <TouchableOpacity activeOpacity={.9} style={[styles.container, this.props.isShowUnderline && styles.borderBottom]} onPress={this.props.onPress}>
                <Text style={styles.leftText}>
                    { this.props.leftText }
                </Text>
                <View style={styles.rightContainer}>
                    {
                        this._renderRight()
                    }
                    {
                        !this.props.rightComponent && this.props.isShowArrow && <Image style={styles.rightImg} source={require('./../../assets/images/i_right.png')}/>
                    }
                </View>
            </TouchableOpacity>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    leftText: {
        fontSize: 14,
        color: '#000'
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rightText: {
        color: '#bfbfbf',
        fontSize: 12
    },
    rightImg: {
        width: 20,
        height: 20,
        marginHorizontal: 7
    }

});