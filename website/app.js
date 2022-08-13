// Personal API Key for OpenWeatherMap API
const apiKey = 'cd9daeb0b94b7da5c52304970af4c0a9&units=imperial';


/* Global Variables */
const zipInput = document.querySelector('#zip');
const feelingInput = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');
const errorDiv = document.querySelector('#error');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();


// Start Functions
const getTemprature = async (apiUrl) => {
    try {
        const res = await fetch(apiUrl).then(res => res.json());
        const temprature = await res.main.temp;

        // return temprature from the api
        return temprature;

    } catch (err) {
        console.log(err.message);
        handleError(err);
    }
};


const setInfo = async (temprature) => {
    try {
        const bodyInfo = {
            date: newDate,
            temp: temprature,
            feeling: feelingInput.value
        };
        console.log('temprature is', temprature);
        return bodyInfo;

    } catch (err) {
        console.log(err);
        handleError(err)
    }
};


const postData = async (url = '', bodyInfo = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyInfo)
    });
    try {
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        handleError(error)
    }
};
const getAll = async (url) => {
    const response = await fetch(url);
    try {
        const allData = await response.json();
        return allData;
    } catch (err) {
        console.error(err);
        handleError(error)
    }
};
const showResult = async (allData) => {

    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feeling;
    document.getElementById("date").innerHTML = allData.date;

};
// End Functions

// Start EventListner
generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${apiKey}`
    getTemprature(apiUrl).
        then((temprature) => {
            setInfo(temprature).
                then((bodyInfo) => {
                    postData("/post", bodyInfo).
                        then((allData) => {
                            getAll("/all").
                                then(allData => {
                                    showResult(allData);
                                });
                        });
                });
        });
});


// appropriately handle the error
function handleError(error) {
    errorDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
        ${error}
    </div>`;
}
