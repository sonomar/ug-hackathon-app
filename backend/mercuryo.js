async function getCountryFees(widgetId){
    let response = await fetch(`https://api.mercuryo.io/v1.6/public/rates?widget_id=${widgetId}`)
    let data = await response.json();
    return data;
}

getCountryFees.then(data => console.log(data));

exports.getCountryFees = getCountryFees;
