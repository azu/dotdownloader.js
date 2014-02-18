/**
 * Created by azu on 2014/02/16.
 * LICENSE : MIT
 */
    // https://github.com/marcuswestin/WebViewJavascriptBridge
function connectWebViewJavascriptBridge(callback) {
    var rightBack = function (bridge) {
        bridge.init(function (message, responseCallback) {
            if (responseCallback) {
                responseCallback("Right back atcha")
            }
        });
        callback(bridge);
    };
    if (window.WebViewJavascriptBridge) {
        rightBack(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            rightBack(WebViewJavascriptBridge)
        }, false)
    }
}

function postVideoList(videoIDs, callback) {
    /*
    {
    "title"
    "url"
    "videoID"
    }
     */
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('post-video-list', videoIDs, callback)
    });
}

module.exports = postVideoList;