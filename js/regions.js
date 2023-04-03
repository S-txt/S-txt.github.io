const buildBaseRegions = () => {
    document.title = 'Regions'

    localStorage.removeItem('currentRegion')

    document.body.innerHTML = `
        <div class="username"></div>

        <div class="region-section">
            <h1 class="region-main-header">Choose a region!</h1>
            
            <ul class="region-list"></ul>
        </div>
    `
}

const buildRegions = (regions) => {
    const regionList = document.querySelector('.region-list')
    
    for (let i=0; i < regions.length; i++) {
        const liElement = document.createElement('li')
        liElement.classList.add('region')

        const header = document.createElement('h3')
        header.classList.add('region-header')
        header.textContent = regions[i].name

        liElement.appendChild(header)

        const record = document.createElement('p')
        record.classList.add('region-record')
        record.textContent = regions[i].record

        liElement.appendChild(record)

        const button = document.createElement('button')
        button.classList.add('region-start')
        button.textContent = "START"
        button.setAttribute('name', regions[i].name)
        button.setAttribute('difficulty', regions[i].difficulty)

        button.addEventListener('click', (e) => {
            
            localStorage.setItem('currentRegion', e.target.name);

            let regionDiff = e.target.attributes.difficulty.value
            let regionName = e.target.name
            console.log("Load map " +  regionName + "\ndifficulty: " + regionDiff)
            buildGamePage(regionName, regionDiff);
        });

        liElement.appendChild(button)

        regionList.appendChild(liElement)
    
    }
} 

const buildRegionPage = () => {

    const regions = [
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


    buildBaseRegions();
    buildRegions(regions)
}