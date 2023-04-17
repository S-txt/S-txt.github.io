const buildBaseWardrobe = () => {
    const wardrobe = document.createElement('div')
    wardrobe.classList.add('wardrobe')
    wardrobe.innerHTML = `
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
    `

    document.querySelector('.main-section').prepend(wardrobe)

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