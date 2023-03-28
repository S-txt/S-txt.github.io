// import { buildLeaderBoardPage } from "./leaderBoard";

window.addEventListener('load',function (){

    // const queryString = window.location.searchParams(); // Returns:'?q=123'

    // Further parsing:
    // const params = new URL(document.location).searchParams;
    // const q = parseInt(params.get("q"));
    // console.log(q)


    function get_datetime() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return date + ' ' + time;
    }

    // console.log(get_datetime())

    buildRegionPage();

    const params = new URL(document.location).searchParams;

    document.querySelector('.username').textContent = params.get('username')

    console.log(params.get("id"), params.get("username"))

});