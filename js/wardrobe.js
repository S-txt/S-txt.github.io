const buildBaseWardrobe = () => {
    document.title = 'Wardrobe'

    document.body.innerHTML = `
    <div class="wardrobe">    
        <div class="exit-section wardtobe__exit"><button class="exit">Back</button></div>
        <h1 class="wardrobe__header">Choose your fighter!</h1>  
        
        <ul class="wardrobe__icons-list">
            <li class="wardrobe__icon chosen-icon" name="Gotoku">
                <img class="wardrobe__icon-img" src="./img/gotoku-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Gotoku</h4>
            </li>
            <li class="wardrobe__icon" name="Yurei">
                <img class="wardrobe__icon-img" src="./img/yurei-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Yurei</h4>
            </li>
            <li class="wardrobe__icon buy" name="Old girl">
                <img class="wardrobe__icon-img" src="./img/old_girl-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Old Girl</h4>
            </li>
            <li class="wardrobe__icon coming-soon" name="Onre">
                <img class="wardrobe__icon-img" src="./img/onre-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Onre</h4>
            </li>
            <li class="wardrobe__icon coming-soon">
                <img class="wardrobe__icon-img" src="./img/yurei-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Yamahashi</h4>
            </li>
            <li class="wardrobe__icon coming-soon">
                <img class="wardrobe__icon-img" src="./img/yurei-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Katamoto</h4>
            </li>
            <li class="wardrobe__icon coming-soon">
                <img class="wardrobe__icon-img" src="./img/yurei-icon.png" alt="">
                <h4 class="wardrobe__icon-header">Yobi</h4>
            </li>
            
        </ul>
    </div>
    `
    
    // <input type="radio" class="stv-radio-button" name="radiobuttonTest" id="button3" value="3">
    // <label for="button3" id="friendsButton">friends</label>
        
    const exitBtn = document.querySelector('.exit')

    exitBtn.addEventListener('click', () => {
        buildRegionPage()
    });
}

const buildWardtobePage = async () => {

    buildBaseWardrobe();

    if (localStorage.getItem('currentSkin')) {
        document.querySelector('.chosen-icon').classList.remove('chosen-icon')
        document.querySelector(`.wardrobe__icon[name="${localStorage.getItem('currentSkin')}"]`).classList.add('chosen-icon')
    }

    document.querySelectorAll('.wardrobe__icon').forEach((el) => {
        if(el.classList.contains('buy')) {
            el.addEventListener('click', () => window.location.href = 'https://tonplay.io/games/5JlMHQbOve?draft=true')
        }

        if(!el.classList.contains('buy') && !el.classList.contains('coming-soon')) {
            el.addEventListener('click', () => {
                document.querySelector('.chosen-icon').classList.remove('chosen-icon');
                el.classList.add('chosen-icon')
                localStorage.setItem('currentSkin', el.getAttribute('name'));
            })
        }
    })

}