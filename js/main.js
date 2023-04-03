window.addEventListener('load', async () => {

    const currentUser = await getCurrentUser()

    localStorage.setItem('userId', currentUser.telegram_id);

    buildRegionPage();

    document.querySelector('.username').textContent = currentUser.username

    console.log(currentUser.telegram_id, currentUser.username)

});





