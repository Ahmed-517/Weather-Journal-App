// Personal API Key for OpenWeatherMap API
let apiKey = 'cd9daeb0b94b7da5c52304970af4c0a9';
apiKey += '&units=metric';  // to get the celicius value

/* Global Variables */
const zipInput = document.querySelector('#zip');
const feelingInput = document.querySelector('#feeling');
const generateBtn = document.querySelector('#generate');
const errorDiv = document.querySelector('#error');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to GET Project Data */
const retrieveData = async () => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&appid=${apiKey}`
        const res = await fetch(apiUrl).then(res => res.json());
        const temprature = await res.main.temp;
        console.log(temprature);
        console.log(newDate);
        console.log(feelingInput.value);
    
        await fetch('/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: newDate,
                temp: temprature,
                feeling: feelingInput.value
            }),
        });
        const request = await fetch('/all');
        // Transform into JSON
        const allData = await request.json()
        console.log('alldata', allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feeling;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
        errorDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${error}
            </div>
        `;
    }
}

// Event listener
generateBtn.addEventListener('click', retrieveData)