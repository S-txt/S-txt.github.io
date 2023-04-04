window.addEventListener('load', async () => {

    const currentUser = await getCurrentUser()

    localStorage.setItem('userId', currentUser.telegram_id);

    const params = new URL(document.location).searchParams;

    localStorage.setItem('tonPlayId', params.get('ton_play_id'))

    await buildRegionPage();

    document.querySelector('.username').textContent = currentUser.username

    console.log(currentUser.telegram_id, currentUser.username)

    const wallet = await getWallet()

    console.log(wallet);

});





