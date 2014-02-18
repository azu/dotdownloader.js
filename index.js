/**
 * Created by azu on 2014/02/16.
 * LICENSE : MIT
 */
var Promise = require("bluebird");

(function () {
    var xhr = require("./Lib/xhr");
    var aLinks = document.querySelectorAll(".lesson_title");
    var documentTitle = document.title;
    var lessonTitle = document.querySelector('meta[property="og:title"]').content || documentTitle;
    var urlObject = Array.prototype.slice.call(aLinks).map(function (ele) {
        return {
            "lessonTitle": lessonTitle,
            "title": ele.textContent,
            "url": ele.href
        };
    });

    function getYoutubeID(source) {
        var reg = /videoId: '(.*?)',/i;
        var m = source.match(reg);
        return m && m[1];
    }

    var promiseList = urlObject.map(function (object) {
        return xhr(object["url"]).then(getYoutubeID).then(function (youtubeID) {
            object.videoID = youtubeID;
            return object;
        });
    });
    Promise.all(promiseList).then(function (objects) {
        console.log("objects", objects);
        require("./Lib/postVideoList")(objects, function () {
            console.log("youtubeIDs", objects);
        });
    });
})();