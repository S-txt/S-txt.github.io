const buildBaseRegions = () => {
    document.title = 'Regions'

    localStorage.removeItem('currentRegion')

    document.body.innerHTML = `
        <div class="username"></div>

        <div class="region-section">
            <h1 class="region-main-header">Choose a region!</h1>
            <button class="region__fighterBtn">Choose a fighter!</button>
            
            <ul class="region-list"></ul>
            
        </div>
    `

    const fighterBtn = document.querySelector('.region__fighterBtn')

    fighterBtn.addEventListener('click', () => {
        buildWardtobePage()
    })
}

const buildRegions = async (regions) => {
    const regionList = document.querySelector('.region-list')
    
    for (let i=0; i < regions.length; i++) {
        const liElement = document.createElement('li')
        liElement.classList.add('region')

        const header = document.createElement('h3')
        header.classList.add('region-header')
        header.textContent = regions[i].name

        liElement.appendChild(header)

        // const record = document.createElement('p')
        // record.classList.add('region-record')
        // record.textContent = regions[i].record

        // liElement.appendChild(record)

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

const buildRegionPage = async () => {

    const regions = await getLocations()


    buildBaseRegions();
    buildRegions(regions)
}