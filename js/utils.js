const SKINS = {
    "Gotoku": "./img/gotoku.png",
    "Yurei": "./img/yurei.png"
}

function get_datetime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
}