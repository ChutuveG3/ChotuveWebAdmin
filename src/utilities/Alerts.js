import Swal from "sweetalert2";

export function showSuccess(title, message = '') {
    return (
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: false,
            text: message,
            timer: 1500
    })  )
}

export function showFail(title) {
    return (
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    )
}

export function showWarning(title, message) {
    return (
        Swal.fire({
            title: title,
            text: message,
            type: "warning",
            closeOnConfirm: false
        })
    )
}

export function showInfo(title, message) {
        Swal.fire({
            icon: 'info',
            title: title,
            text: message,
            showConfirmButton: false,
        })
}
