
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




$(document).on('click','.btn-style',function () {
    var progress = null;
    var countDone = 0;
    var countQuitzDone = 0;
    var quitz=null;
    var slide = null;
    var text = null;
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
    if($('#length').val()!=0){
          slide = Math.floor((countDone/ $('#length').val() )*100);
    }
    if($("#totalQuitz").val()!=0){
          quitz = Math.floor((countQuitzDone/$("#totalQuitz").val())*100);
    }
    if(slide>100){
        slide =100;
    }
    if(quitz>100){
        quitz =100;
    }



    if (slide){
        text = "Xác nhận hoàn thành học liệu! Bạn đã hoàn thành "
            +slide+" % slide";
    }
    if(quitz && slide){
          text = "Xác nhận hoàn thành học liệu bạn đã hoàn thành "
            +slide+" % slide, "+ quitz +" % câu hỏi  đã đạt";
    }
    if(text){
        ConfirmAlert(function () {
            stompClient.send(`${topic}/endLearning`, {}, JSON.stringify({
                partDone: countDone,
                quitzDone: countQuitzDone,
            }));
        },"Xác nhận hoàn thành", text,"infor");

    }else{
        ConfirmAlert(function () {
        },"Xác nhận hoàn thành", "Bạn hoàn thành 0% !","infor");
    }
});




