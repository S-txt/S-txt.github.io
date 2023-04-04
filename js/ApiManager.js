const getCurrentUser = async () => {
    const params = new URL(document.location).searchParams;

    return await fetch(`https://krecker.me:7000/get_user/${params.get('telegram_id')}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getTotalScore = async () => {
    return await fetch(`https://krecker.me:7000/get_total_score`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getLocationScore = async name => {
    return await fetch(`https://krecker.me:7000/get_location_score/${name}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const importScore = async (userId, regionName, score) => {

    const data = {
        "telegram_id": parseInt(userId),
        "location_name": regionName,
        "score": score, 
        "date_time": get_datetime()
    }
    
    return await fetch(`https://krecker.me:7000/import_score`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => console.log(err));
};

const getLocations = async () => {
    return await fetch(`https://krecker.me:7000/get_all_locations`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getWallet = async () => {
    const tonId = localStorage.getItem('tonPlayId')

    return await fetch(`https://external.api.tonplay.io/x/auth/v1/user/${tonId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Tonplay": "5JlMHQbOve:gZRAAgbAUJo6c8WGfRkI"
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}


const getAssets = async () => {
    const walletId = localStorage.getItem('walletId')
    
    return await fetch(`https://external.api.tonplay.io/x/tondata/v2/assets/:${walletId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Tonplay": "5JlMHQbOve:gZRAAgbAUJo6c8WGfRkI"
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}