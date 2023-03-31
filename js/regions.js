const buildBaseRegions = () => {
    document.title = 'Regions'

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

        button.addEventListener('click', () => {
            buildGamePage();
        });

        liElement.appendChild(button)

        regionList.appendChild(liElement)
    
    }
} 

const buildRegionPage = () => {

    const regions = [
        {
            'name': 'Saitama',
            'record': '12354'
        },
        {
            'name': 'Chiba',
            'record': '34234'
        },
        {
            'name': 'Kanagawa',
            'record': '65344'
        },
        {
            'name': 'Ibaraki',
            'record': '123'
        },
        {
            'name': 'Tochigi',
            'record': '4315'
        },
        {
            'name': 'Gunma',
            'record': '1764'
        },
        {
            'name': 'Yamanashi',
            'record': '13405'
        },
    ]


    buildBaseRegions();
    buildRegions(regions)
}