'use strict';

// var stompClient = null;
var stompClient = null;
var currentSubscription;
var topic = null;
var socket;
let userName = null;

function doConnect() {
    $('#spinner').css("display", "flex");
    socket = new SockJS('/sock');
    stompClient = Stomp.over(socket);

    stompClient.heartbeatOutgoing = 2000;
    stompClient.heartbeatIncoming = 2000;

    stompClient.debug = () => {
    };
    stompClient.connect({}, onConnectedNotice, onErrorNotice);
    socket.onclose = function () {
        console.log("die");
        $('#spinner').css("display", "flex");
        alert("lost connection");
    };
    stompClient.onStompError = function () {
        $('#spinner').css("display", "flex");
        alert("lost connection");
    }
}

function onConnectedNotice() {

    // roomIdDisplay.textContent = roomId;
    topic = `/notification-app/${userName}`;
    // console.log('before sub'+newRoomId);
    currentSubscription = stompClient.subscribe(`/notification/${userName}`,
        onMessageReceivedNotice);

}

function onMessageReceivedNotice(payload) {
    var message = JSON.parse(payload.body);
    // console.log(message)
}



function onErrorNotice(error) {
    console.log('uh oh! service unavailable');
}

let beforeIdScorm = null;

function startLearning() {

    let chapterId = $(this).parent().parent().attr('data-id')
    let courseWareId = $(this).attr('data-id')
    let length = ($(this).attr('data-length') == 'null') ? null : $(this).attr('data-length');
    let totalQuitz = ($(this).attr('data-quitz') == 'null') ? 0 : $(this).attr('data-quitz');
    let courseWareType = $(this).attr('data-type');
    let progress = null;
    let countDone = 0;
    let countQuitzDone = 0;
    if (beforeIdScorm) {
        let itemId = 'ispring::{' + beforeIdScorm + '}';
        progress = JSON.parse(window.localStorage.getItem(itemId));
        for (var key in progress.slideStates) {
            if (progress.slideStates[key].completed) countDone++
            if (progress.slideStates[key].quizInfo) {
                if (progress.slideStates[key].quizInfo.passed) {
                    countQuitzDone++;
                }
            }
        }

    }
    beforeIdScorm = ($(this).attr('data-id-scorm') == 'null') ? null : $(this).attr('data-id-scorm');
    // console.log(countQuitzDone)
    stompClient.send(`${topic}/endLearning`, {}, JSON.stringify({
        partDone: countDone,
        quitzDone: countQuitzDone,
    }));
    stompClient.send(`${topic}/learning`, {}, JSON.stringify({
        userName: userName,
        idCourseWare: courseWareId,
        idChapter: chapterId,
        length: length,
        totalQuitz: totalQuitz,
        courseWareType: courseWareType,
        type: "LEARNING"
    }));
};

function endLearning() {
    let progress = null;
    let countDone = 0;
    let countQuitzDone = 0;
    if (beforeIdScorm) {
        let itemId = 'ispring::{' + beforeIdScorm + '}';
        progress = JSON.parse(window.localStorage.getItem(itemId));
        for (var key in progress.slideStates) {
            if (progress.slideStates[key].completed) countDone++
            if (progress.slideStates[key].quizInfo) {
                if (progress.slideStates[key].quizInfo.passed) {
                    countQuitzDone++;
                }
            }
        }
    }
    // console.log(beforeIdScorm)
    beforeIdScorm = null;
    // console.log(countDone)

    stompClient.send(`${topic}/endLearning`, {}, JSON.stringify({
        partDone: countDone,
        quitzDone: countQuitzDone,
    }));
}

//
// let currentUrl = window.location.pathname;
// if (currentUrl.includes("/append/learn/course")) {
//     //check unload jsp
    window.onbeforeunload = function () {
        let countDone = 0;
        let countQuitzDone = 0;
        if (beforeIdScorm) {
            let itemId = 'ispring::{' + beforeIdScorm + '}';
            let progress = JSON.parse(window.localStorage.getItem(itemId));
            for (var key in progress.slideStates) {
                if (progress.slideStates[key].completed) countDone++
                if (progress.slideStates[key].quizInfo) {
                    if (progress.slideStates[key].quizInfo.passed) {
                        countQuitzDone++;
                    }
                }
            }

        }
        // console.log(countDone)
        stompClient.send(`${topic}/header-scorm`, {}, JSON.stringify({
            partDone: countDone,
            quitzDone: countQuitzDone,
        }));
        endLearning();
        return 'Bạn có muốn thoát khỏi trang này không?';

    }
    // let tabLearning = $('#menu3');
    // var observer = new MutationObserver(function(mutations) {
    //     mutations.forEach(function(mutation) {
    //         if (mutation.attributeName === "class") {
    //             var attributeValue = $(mutation.target).prop(mutation.attributeName);
    //             console.log($(mutation.target))
    //             if (attributeValue.includes("active") && attributeValue.includes("show")) return;
    //             // console.log("Class attribute changed to:", attributeValue);
    //             endLearning();
    //         }
    //     });
    // });
    // observer.observe(tabLearning[0], {
    //     attributes: true
    // });
}
