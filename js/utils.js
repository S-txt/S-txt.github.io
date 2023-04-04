const SKINS = {
    "Gotoku": {"src" : "./img/gotoku.png", "frames":[4,6,3,2,4]},
    "Yurei": {"src" : "./img/yurei.png", "frames":[4,4,6,2,3]}
}

function get_datetime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
}