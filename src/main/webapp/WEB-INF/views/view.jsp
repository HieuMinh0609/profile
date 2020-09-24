<%--
  Created by IntelliJ IDEA.
  User: hieu4
  Date: 9/21/2020
  Time: 3:01 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="en">
<html>
<head>
    <title>Scrom</title>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<%--<script type="text/javascript"  src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.0.min.js"></script>--%>
    <%--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">--%>
    <script
            src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.3.0/sockjs.js"></script>
    <script
            src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js"></script>

    <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>


</head>
<style>
    .btn-style{
        position: absolute;
        top: 5px;
        height: 60px;
        font-size: 25px;
        border: none;

    }
    .swal2-popup{
       font-size: 30px;
    }
</style>
<body  id="container" >
        <div  style="height: 100vh;width: 100%">
                <iframe   id="iframe" style="margin: 0 auto;height: 100%;" width="100%"
            src="${infor.linkScorm}" ></iframe>
        </div>
        <button id="mydiv"  class="btn btn-warning btn-style">Xác nhận hoàn thành học liệu</button>
</body>




<input type="hidden" id="userName" value="${infor.userName}">
<input type="hidden" id="courseWareType" value="${infor.courseWareType}">
<input type="hidden" id="idChapter" value="${infor.idChapter}">
<input type="hidden" id="idCourseWare" value="${infor.idCourseWare}">
<input type="hidden" id="length" value="${infor.length}">
<input type="hidden" id="totalQuitz" value="${infor.totalQuitz}">
<input type="hidden" id="type" value="${infor.type}">
<input type="hidden" id="token" value="${infor.token}">
<input type="hidden" id="springId" value="${infor.springId}">
<script
        src="/web-view/static/js/usingLog-web-view.js"></script>
<script src="/web-view/static/common/CommonAlert.js"></script>
<%--<script src="/web-view/static/common/jquery.ui.touch-punch.js"></script>--%>
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="http://code.jquery.com/ui/1.8.17/jquery-ui.min.js"></script>
<script src="/web-view/static/common/jquery.ui.touch-punch.min.js"></script>
<script>
    $( document ).ready(function() {
        doConnectView();
        $('#mydiv').draggable();
    });


    var dragItem = document.querySelector("#mydiv");
    var container = document.querySelector("#container");

    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === dragItem) {
            active = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        active = false;
    }

    function drag(e) {
        if (active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, dragItem);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
</script>

</html>
