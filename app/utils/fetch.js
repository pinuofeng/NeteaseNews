/**
 * Created by HuangXiaoFeng on 2018-02-23.
 * 封装fetch
 *
 */

function toForm(data) {
    let formData = new FormData();
    let keyArr = Object.keys(data);
    if(keyArr.length<1){return {}}
    keyArr.map((item)=>{
        formData.append(item, data[item]);
    });
    return formData;
}

function toJsonStr(data) {
    return JSON.stringify(data);
}

function formatData(headers, data) {
    if(!headers || !headers['Content-Type'] || headers['Content-Type']==='application/x-www-form-urlencoded'){
        return toForm(data);
    }
    switch (headers['Content-Type']){
        case 'application/json':
            return toJsonStr(data);
        default :
            return toForm(data);
    }
}


const ajax = ({url, method, data, dataType, headers, success, error, complete})=>{

    let options = {};

    //默认method
    options['method'] = method || 'GET';

    //默认headers
    options['headers']= Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded', //默认格式
        'credentials': 'include', //包含cookie
        'mode': 'cors', //允许跨域
    }, headers);

    //处理body
    options.method.toUpperCase() === 'POST' && (options['body'] = data? formatData(headers, data) : '');

    fetch(url, options)
        .then((response) => !dataType || dataType==='json'? response.json(): response.text())
        .then((responseJson) => {
            success && success(responseJson);
            complete && complete(responseJson);
        }).catch((err) => {
            error(err);
            complete && complete();
        });
};

export default ajax;
