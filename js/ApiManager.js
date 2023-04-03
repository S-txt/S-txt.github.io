function get_datetime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
}

const getCurrentUser = async () => {
    const params = new URL(document.location).searchParams;

    return await fetch(`http://130.193.50.12:7000/get_user/${params.get('id')}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getTotalScore = async () => {
    return await fetch(`http://130.193.50.12:7000/get_total_score`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const getLocationScore = async name => {
    return await fetch(`http://130.193.50.12:7000/get_location_score/${name}`)
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
    
    return await fetch(`http://130.193.50.12:7000/import_score`, {
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