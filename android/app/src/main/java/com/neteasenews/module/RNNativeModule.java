package com.neteasenews.module;

import android.content.Context;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNNativeModule extends ReactContextBaseJavaModule {

	private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public RNNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * 要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
     * 方法的返回类型必须为void。React Native的跨语言访问是异步进行的，
     * 所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件
     * @param message
     * @param duration
     */
    @ReactMethod
    public void show(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    /**
     * 模块名前的RCT前缀会被自动移除。
     * 所以如果返回的字符串为"RCTmytoast"，在JavaScript端依然可以通过React.NativeModules.mytoast访问到这个模块。
     * @return
     */
    @Override
    public String getName() {
        return "RNNativeModule";
    }

}
