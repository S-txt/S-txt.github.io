const buildBaseLeaderBoard = () => {
    document.title = 'LeaderBoard'

    document.body.innerHTML = `
    <div class="leaderBoard">
        <h1 class="leaderBoardHeader">Leader Board</h1>

        <div class="btn-group">
            <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button1" value="1">
            <label for="button1" id="globalButton">global</label>
            
            <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button2" value="2" checked>
            <label for="button2" id="regionButton">region</label>
        </div>

        <ul class="leaderList"></ul>

        <div class="exit-section"><button class="exit">Back</button></div>

    </div>
    `
    
    // <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button3" value="3">
    // <label for="button3" id="friendsButton">friends</label>
        
    const exitBtn = document.querySelector('.exit')

    exitBtn.addEventListener('click', () => {
        buildRegionPage()
    });
}

const buildLeaderBoard = (arr, myId) => {
    const leaderList = document.querySelector('.leaderList');

    for (let i=0; i < Math.min((myId <= 10 ? 10 : 5), arr.length); i++){
        let liElement = document.createElement('li')
        liElement.className = 'leaderItem'

        let leaderNum = document.createElement('span')
        leaderNum.className = 'leader-num'
        leaderNum.textContent = arr[i].rank

        let leaderName = document.createElement('span')
        leaderName.className = 'leader-name'
        leaderName.textContent = arr[i].username

        let leaderScore = document.createElement('span')
        leaderScore.className = 'leader-score'
        leaderScore.textContent = Math.floor(arr[i].total_score / (arr[i].total_score >= 10000 ? 1000 : 1)) + (arr[i].total_score >= 10000 ? 'k' : '')

        if (i + 1 === myId) {
            leaderNum.classList.add('leader-me')
            leaderName.classList.add('leader-me')
            leaderScore.classList.add('leader-me')

            leaderName.textContent = 'me'
        }

        liElement.appendChild(leaderNum)
        liElement.appendChild(leaderName)
        liElement.appendChild(leaderScore)

        leaderList.appendChild(liElement);
    }

    if (myId > 8) {

        let liElement = document.createElement('li')
        liElement.className = 'leaderItem'
        const points = document.createElement('div')
        points.className = 'leader-points'
        points.textContent = '...'
        liElement.appendChild(points)
        leaderList.appendChild(liElement);

        let i = myId - 3

        for (i; i<(myId - 2 < arr.length || myId - 1 < arr.length ? myId + 2: arr.length); i++){
            let liElement = document.createElement('li')
            liElement.className = 'leaderItem'
    
            let leaderNum = document.createElement('span')
            leaderNum.className = 'leader-num'
            leaderNum.textContent = myId
    
            let leaderName = document.createElement('span')
            leaderName.className = 'leader-name'
            leaderName.textContent = arr[i].username
    
            let leaderScore = document.createElement('span')
            leaderScore.className = 'leader-score'
            leaderScore.textContent = Math.floor(arr[i].total_score / (arr[i].total_score >= 10000 ? 1000 : 1)) + (arr[i].total_score >= 10000 ? 'k' : '')
    
            if (i + 1 === myId) {
                leaderNum.classList.add('leader-me')
                leaderName.classList.add('leader-me')
                leaderScore.classList.add('leader-me')
    
                leaderName.textContent = 'me'
            }
    
            liElement.appendChild(leaderNum)
            liElement.appendChild(leaderName)
            liElement.appendChild(leaderScore)
    
            leaderList.appendChild(liElement);
        }    
    }
}

const buildLeaderBoardPage = async () => {

    buildBaseLeaderBoard();

    globalArr = await getTotalScore();
    regionArr = await getLocationScore(localStorage.getItem('currentRegion'));

    myGlobalId = globalArr.find(el => el.telegram_id === parseInt(localStorage.getItem('userId')))?.rank;
    myRegionId = regionArr.find(el => el.telegram_id === parseInt(localStorage.getItem('userId')))?.rank;

    const globalButton = document.getElementById('globalButton');
    const regionButton = document.getElementById('regionButton');

    globalButton.addEventListener('click', () => {
        const leaderList = document.querySelector('.leaderList');
        leaderList.innerHTML = ''
        buildLeaderBoard(globalArr, myGlobalId);
    });
    
    regionButton.addEventListener('click', () => {
        const leaderList = document.querySelector('.leaderList');
        leaderList.innerHTML = ''
        buildLeaderBoard(regionArr, myRegionId);
    });

    buildLeaderBoard(regionArr, myRegionId);

}