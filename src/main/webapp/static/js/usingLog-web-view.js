
// var stompClient = null;
let stompClient = null;
let currentSubscription;
let topic = "/notification-app/"+$('#userName').val();
let socket;
let userName = $('#userName').val();

function doConnectView() {
   //  $('#spinner').css("display", "flex");
   //  //socket = new SockJS('http://elearning-uat.vnpost.vn/sock');
   //  socket = new SockJS('http://localhost:8080/sock');
   //  stompClient = Stomp.over(socket);
   //
   //  stompClient.heartbeatOutgoing = 2000;
   //  stompClient.heartbeatIncoming = 2000;
   //
   //  stompClient.debug = () => {
   //  };
   //
   //  stompClient.connect({}, onConnectedNotice, onErrorNotice);
   // //  stompClient.connect({}, function (frame) {
   // //
   // //      console.log('Connected: ' + frame);
   // //
   // //      startLearning();
   // //
   // //  });
   //  socket.onclose = function () {
   //      console.log("die");
   //      $('#spinner').css("display", "flex");
   //      alert("lost connection");
   //  };
   //  stompClient.onStompError = function () {
   //      $('#spinner').css("display", "flex");
   //      alert("lost connection");
   //  }

        // socket = new SockJS('http://localhost:8080/sock');
          socket = new SockJS('http://elearning-uat.vnpost.vn/sock');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
        //    setConnectedSocket(true);
            console.log('Connected: ' + frame);
            startLearning();

        });




}

// function onConnectedNotice() {
//
//     // roomIdDisplay.textContent = roomId;
//     topic = `/notification-app/${userName}`;
//     // console.log('before sub'+newRoomId);
//     currentSubscription = stompClient.subscribe(`/notification/${userName}`,
//         onMessageReceivedNotice);
//
// }
//
// function onMessageReceivedNotice(payload) {
//     var message = JSON.parse(payload.body);
//     // console.log(message)
// }
//
//
//
// function onErrorNotice(error) {
//     console.log('uh oh! service unavailable');
// }

var beforeIdScorm = null;

function startLearning() {

    var chapterId = $('#idChapter').val();
    var courseWareId = $('#idCourseWare').val();
    var length = $('#length').val();
    var totalQuitz =  $("#totalQuitz").val();
    var courseWareType = $('#courseWareType').val();
    var progress = null;
    var countDone = 0;
    var countQuitzDone = 0;

    stompClient.send(`${topic}/learning`, {}, JSON.stringify({
        userName: userName,
        idCourseWare: courseWareId,
        idChapter: chapterId,
        length: length,
        totalQuitz: totalQuitz,
        courseWareType: courseWareType,
        type: "LEARNING"
    }));
    // stompClient.send(`${topic}/endLearning`, {}, JSON.stringify({
    //     partDone: countDone,
    //     quitzDone: countQuitzDone,
    //     id:1
    // }));
};

function endLearning() {
    var progress = null;
    var countDone = 0;
    var countQuitzDone = 0;
    if (beforeIdScorm) {
        var itemId = 'ispring::{' + beforeIdScorm + '}';
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



window.onbeforeunload = function () {
    var countDone = 0;
    var countQuitzDone = 0;
    if (beforeIdScorm) {
        var itemId = 'ispring::{' + beforeIdScorm + '}';
        var progress = JSON.parse(window.localStorage.getItem(itemId));
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

