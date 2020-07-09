import Swal from "sweetalert2";

export function showSuccess(title) {
    return (
        Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
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
