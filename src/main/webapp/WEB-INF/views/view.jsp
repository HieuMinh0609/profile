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


</head>
<style>
    .btn-style{
        position: absolute;
        top: 5px;
        height: 53px;
        font-size: 25px;

    }
</style>
<body >
        <%--<iframe width="100%" height="600" src="/static/file/Scrom/res/index.html"> </iframe>--%>
        <%--<div class="col-md-12" style="padding-bottom: 56.55%"><iframe class="col-md-12 position-absolute" src="/e-learning/courseware/scorm/f5197b3b-c259-4a42-b18c-c16d4dd71c80/res/index.html" ></iframe></div>--%>
         <%--<iframe width="100%" height="600" src="/e-learning/courseware/scorm/P2_Hoinhap/res/index.html" ></iframe>--%>
        <div style="height: 100vh;width: 100%">
                <iframe   id="iframe" style="margin: 0 auto;height: 100%;" width="100%"
            src="${infor.linkScorm}" ></iframe>

        </div>
        <button  class="btn btn-warning btn-style">Xác nhận hoàn thành học liệu</button>
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
<script>
    $( document ).ready(function() {
        doConnectView();
    });



</script>

</html>
