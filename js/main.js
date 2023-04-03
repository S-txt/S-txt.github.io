// import { buildLeaderBoardPage } from "./leaderBoard";
window.addEventListener('load', async () => {

    const currentUser = await getCurrentUser()

    console.log(currentUser)

    localStorage.setItem('userId', currentUser.telegram_id);

    buildRegionPage();
    // buildLeaderBoardPage()

    document.querySelector('.username').textContent = currentUser.username

    console.log(currentUser.telegram_id, currentUser.username)

});


