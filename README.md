# NeteaseNews
这是一个ReactNative仿网易新闻APP的Demo.

## 启动页：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1524643809.png)

## 首页：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1522724420.png)


## 图文新闻详情页：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1522721716.png)


## 视频半屏效果：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1523522615.png)


## 视频全屏效果：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1523522641.png)

## 视频:
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1523522342.png)

## 我的:
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1523170589.png)

## 热更新：
![Image text](https://github.com/h406621397/ImageRepository/blob/master/Screenshot_1524805643.png)


# 运行项目：
1、NeteaseNews目录下执行yarn或npm i 命令。<br>
2、执行react-native run-android或npm run android命令。<br>


# 基本功能：
1、使用react-native-tab-navigator实现APP底部菜单切换<br>
2、首页和视频页使用FlatList实现下拉刷新/上拉加载功能<br>
3、首页和视频页使用react-native-scrollable-tab-view实现选项卡切换栏目新闻功能<br>
4、使用react-native-htmlview实现图文新闻详情页功能<br>
5、使用react-native-video、react-native-orientation实现视频新闻详情页功能<br>
6、安卓下添加了对GIF图片的支持(IOS默认支持)<br>
7、使用react-native-splash-screen添加了APP启动页，避免APP启动白屏<br>
8、"我的"页面添加了RN动画<br>
9、添加了storage(数据存储)、elements(UI组件)、swiper(滑动)、vector-icons(图标)等常用库<br>
10、使用CodePush实现了热更新功能，可静默更新或提示更新<br>



# 项目中的问题：
1、路由页面切换时的自定义动画效果存在BUG<br>
2、当页面存在FlatList组件时，在componentWillMount/componentDidMount里start一个无限循环的动画导致FlatList列表数据不显示。<br>
3、borderRadius在android低版本(目前测试的4.1.2)下的绘制不完美<br>
4、视频在全屏状态下，低版本android对StatusBar hidden的兼容问题<br>


# 其它：
* 由于接口权限原因，打开新闻详情页面、视频页面时可能出现空白，无法正常请求到新闻数据显示。<br>
* 直播和新闻评论功能尚未开发，有相关接口的童鞋可以私我共同开发学习。<br>