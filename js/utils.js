const REGIONS = [
    {
        'name': 'Saitama',
        'record': '12354',
        'difficulty': 1,
    },
    {
        'name': 'Chiba',
        'record': '34234',
        'difficulty': 2,
    },
    {
        'name': 'Kanagawa',
        'record': '65344',
        'difficulty': 3,
    },
    {
        'name': 'Ibaraki',
        'record': '123',
        'difficulty': 4,
    },
    {
        'name': 'Tochigi',
        'record': '4315',
        'difficulty': 1,
    },
    {
        'name': 'Gunma',
        'record': '1764',
        'difficulty': 1,
    },
    {
        'name': 'Yamanashi',
        'record': '13405',
        'difficulty': 1,
    },
]

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