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

            <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button3" value="3">
            <label for="button3" id="friendsButton">friends</label>
        </div>

        <ul class="leaderList"></ul>

        <div class="exit-section"><button class="exit">Назад</button></div>

    </div>
    `
        
    const exitBtn = document.querySelector('.exit')

    exitBtn.addEventListener('click', () => {
        buildRegionPage()
    });
}

const buildLeaderBoard = (arr, myId) => {
    const leaderList = document.querySelector('.leaderList');

    for (let i=0; i < (myId <= 10 ? 10 : 5); i++){
        let liElement = document.createElement('li')
        liElement.className = 'leaderItem'

        let leaderNum = document.createElement('span')
        leaderNum.className = 'leader-num'
        leaderNum.textContent = arr[i].num

        let leaderName = document.createElement('span')
        leaderName.className = 'leader-name'
        leaderName.textContent = arr[i].name

        let leaderScore = document.createElement('span')
        leaderScore.className = 'leader-score'
        leaderScore.textContent = arr[i].score

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
            leaderNum.textContent = arr[i].num
    
            let leaderName = document.createElement('span')
            leaderName.className = 'leader-name'
            leaderName.textContent = arr[i].name
    
            let leaderScore = document.createElement('span')
            leaderScore.className = 'leader-score'
            leaderScore.textContent = arr[i].score
    
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

    // for (let i=(myId < arr.length - 8 ? arr.length - 6 : myId - 3); i < arr.length; i++) {
    //     let liElement = document.createElement('li')
    //     liElement.className = 'leaderItem'

    //     let leaderNum = document.createElement('span')
    //     leaderNum.className = 'leader-num'
    //     leaderNum.textContent = arr[i].num

    //     let leaderName = document.createElement('span')
    //     leaderName.className = 'leader-name'
    //     leaderName.textContent = arr[i].name

    //     let leaderScore = document.createElement('span')
    //     leaderScore.className = 'leader-score'
    //     leaderScore.textContent = arr[i].score

    //     if (i + 1 === myId) {
    //         leaderNum.classList.add('leader-me')
    //         leaderName.classList.add('leader-me')
    //         leaderScore.classList.add('leader-me')

    //         leaderName.textContent = 'me'
    //     }

    //     liElement.appendChild(leaderNum)
    //     liElement.appendChild(leaderName)
    //     liElement.appendChild(leaderScore)

    //     leaderList.appendChild(liElement);
    // }
}

function buildLeaderBoardPage() {

    buildBaseLeaderBoard();
    
    const myIdG = 95
    const myIdR = 5
    const myIdF = 1

    let arr1 = []
    let arr2 = []
    let arr3 = []

    for (let i=1; i <= 100; i++) {
        arr1.push({
            "num": i,
            "name": "sucky_charm" + i,
            "score": Math.floor(Math.floor(246000 / i) / (246000 / i > 10000 ? 1000 : 1)) + (Math.floor(246000 / i) > 10000 ? 'k' : '')
        })
        arr2.push({
            "num": i,
            "name": "pepepopo" + i,
            "score": Math.floor(Math.floor(246000 / i) / (246000 / i > 10000 ? 1000 : 1)) + (Math.floor(246000 / i) > 10000 ? 'k' : '')
        })
        arr3.push({
            "num": i,
            "name": "kakapuka" + i,
            "score": Math.floor(Math.floor(246000 / i) / (246000 / i > 10000 ? 1000 : 1)) + (Math.floor(246000 / i) > 10000 ? 'k' : '')
        })
    }

    const globalButton = document.getElementById('globalButton');
    const regionButton = document.getElementById('regionButton');
    const friendsButton = document.getElementById('friendsButton');

    globalButton.addEventListener('click', () => {
        const leaderList = document.querySelector('.leaderList');
        leaderList.innerHTML = ''
        buildLeaderBoard(arr1, myIdG);
    });
    
    regionButton.addEventListener('click', () => {
        const leaderList = document.querySelector('.leaderList');
        leaderList.innerHTML = ''
        buildLeaderBoard(arr2, myIdR);
    });

    friendsButton.addEventListener('click', () => {
        const leaderList = document.querySelector('.leaderList');
        leaderList.innerHTML = ''
        buildLeaderBoard(arr3, myIdF);
    });

    buildLeaderBoard(arr2, myIdR);

    // const buttonPush = document.createElement('button')

    // buttonPush.textContent = 'push'

    // buttonPush.addEventListener('click', async () => {
    //     url = "http://130.193.50.12:7000/import"

    //     let user = {
    //         "id": 1,
    //         "username": "telegram username",
    //         "first_name": "Ivan",
    //         "last_name": "Klimov",
    //         "locale": "en"
    //     }
          
    //     let response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     });
        
    //     let result = await response.json();
    //     // alert(result.message);

    //     console.log(result)
    // });

    // document.querySelector('.leaderBoard').appendChild(buttonPush)


    // const buttonGet = document.createElement('button')

    // buttonGet.textContent = 'get'

    // buttonGet.addEventListener('click', async () => {
    //     url = "http://130.193.50.12:7000/user/1"
          
    //     let response = await fetch(url);

    //     if (response.ok) { // если HTTP-статус в диапазоне 200-299
    //     // получаем тело ответа (см. про этот метод ниже)
    //         let json = await response.json();
    //         console.log(json)
    //     } else {
    //         console.log("Ошибка HTTP: " + response.status);
    //     }
    // });

    // document.querySelector('.leaderBoard').appendChild(buttonGet)
    // console.log(JSON.stringify({
    //     "id": 1,
    //     "username": "telegram username",
    //     "first_name": "Ivan",
    //     "last_name": "Klimov",
    //     "locale": "en"
    // }))

}