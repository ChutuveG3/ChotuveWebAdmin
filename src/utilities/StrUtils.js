export function bytesToStr(a,b=2) {
    if (0===a) return "0 Bytes";
    const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a)/Math.log(1024));

    return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
}

export function dateToStr(strDate) {
    const date = Date.parse(strDate)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)

    return `${da} ${mo}, ${ye}`
}

export function dateNowToStr() {
    const date = Date.now()
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    const hr = new Intl.DateTimeFormat('default', { hour: '2-digit' }).format(date)
    const mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(date)
    const se = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(date)

    return `${ye}-${mo}-${da}T${hr}:${mi}:${se}`
}