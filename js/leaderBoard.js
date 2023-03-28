const buildBaseLeaderBoard = () => {
    document.title = 'LeaderBoard'

    document.body.innerHTML = ''

    const leaderBoard = document.createElement('div');
    leaderBoard.classList.add('leaderBoard');

    const header = document.createElement('h1');
    header.classList.add('leaderBoardHeader');
    header.textContent = 'Leader Board';
    leaderBoard.appendChild(header)

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');

    const labels = ['global', 'region', 'friends']

    for (let i=1; i<4; i++) {
        let input = document.createElement('input')
        input.setAttribute("type", "radio")
        input.setAttribute("value", `${i}`)
        input.setAttribute("id", `button${i}`)
        input.setAttribute("name", "radioButtonTest")
        input.classList.add("stv-radio-button")

        if (i === 2) {
            input.setAttribute('checked', '')
        }

        btnGroup.appendChild(input);

        let label = document.createElement('label')
        label.setAttribute('for', `button${i}`)
        label.setAttribute('id', `${labels[i-1]}Button`)
        label.textContent = labels[i-1]

        btnGroup.appendChild(label);
    }
    leaderBoard.appendChild(btnGroup)

    const leaderList = document.createElement('ul');
    leaderList.classList.add('leaderList')
    leaderBoard.appendChild(leaderList)

    const exitSection = document.createElement('div')
    exitSection.classList.add("exit-section")
    const exitBtn = document.createElement('button');
    exitBtn.classList.add('exit')
    exitBtn.textContent = 'Назад'

    exitBtn.addEventListener('click', () => {
        buildRegionPage()
    });

    exitSection.appendChild(exitBtn);
    leaderBoard.appendChild(exitSection);

    document.body.appendChild(leaderBoard);
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