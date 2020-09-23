
// var stompClient = null;
let stompClient = null;
let currentSubscription;
let topic = "/notification-app/"+$('#userName').val();
let socket;
let userName = $('#userName').val();
var beforeIdScorm = $('#springId').val();
function doConnectView() {



        //socket = new SockJS('http://localhost:8080/sock');
        socket = new SockJS('http://elearning-uat.vnpost.vn/sock');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            startLearning();
        });




}



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
    try {
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
    }catch (e) {
        
    }
      console.log(beforeIdScorm);
      console.log(countDone);
      console.log(countQuitzDone);
    stompClient.send(`${topic}/endLearning`, {}, JSON.stringify({
        partDone: countDone,
        quitzDone: countQuitzDone,
    }));
}


function timeOut(){
    var countDone = 0;
    var countQuitzDone = 0;
    try{
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
    }catch (e) {

    }

    stompClient.send(`${topic}/header-scorm`, {}, JSON.stringify({
        partDone: countDone,
        quitzDone: countQuitzDone,
    }));
};

setTimeout(function(){
    function five() {
        timeOut();
        setTimeout(five, 10000);
    }
    five();
}, 10000);


