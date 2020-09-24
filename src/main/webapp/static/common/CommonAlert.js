function  AlertNotificationSuccess(message) {
    Swal.fire({
        position: 'inherit',
        icon: 'success',
        title: message,
        showConfirmButton: true

    })
}

function  AlertNotificationError(message) {
    Swal.fire({
        position: 'inherit',
        icon: 'error',
        title: message,
        showConfirmButton: true

    })
}

function  AlertNotificationInfor(message) {
    Swal.fire({
        position: 'inherit',
        icon: 'info',
        title: message,
        showConfirmButton: true

    })
}

function ConfirmAlert(callBack,title,text,type) {


    Swal.fire({
        title:title,
        text:text,
        type:type,
        icon:"info",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
    }).then((result) => {
        if (result.value) {
        callBack();
    }
});

}

function  AlertNotificationSuccessNotConfirm(message) {
    Swal.fire({
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000
    })

}

