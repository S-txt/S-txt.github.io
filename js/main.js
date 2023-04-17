const buildMainBase = async () => {
    const footer = `
    <div class="footer">
        <div class="btn-group switcher">
        <input type="radio" class="stv-radio-button switch" name="radiobuttonTest" id="button1" value="1">
        <label for="button1" id="fighterBtn">choose a fighter!</label>
        
        <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button2" value="2" checked>
        <label for="button2" id="regionBtn">regions</label>
    </div>
    `

    const content = `
        <div class="username"></div>

        <div class="main-section">
            
            ${footer}   
        </div>
    `
    document.body.innerHTML = content
}

const buildMainPage = async () => {
    await buildMainBase();

    document.getElementById('fighterBtn').addEventListener('click', () => {
        buildWardtobePage();
    });
    
    document.getElementById('regionBtn').addEventListener('click', () => {
        buildRegionPage()
    });

    buildRegionPage();
}



window.addEventListener('load', async () => {

    await buildMainPage()

    const currentUser = await getCurrentUser()

    localStorage.setItem('userId', currentUser.telegram_id);

    const params = new URL(document.location).searchParams;

    localStorage.setItem('tonPlayId', params.get('ton_play_id'))

    document.querySelector('.username').textContent = currentUser.username

    console.log(currentUser.telegram_id, currentUser.username)

    const wallet = await getWallet()

    console.log(wallet);

});





