const button = document.getElementById('button-login');
const username = document.getElementById('validationCustom01');
const number = document.getElementById('validationCustomNumber');
const donorSubmit = document.getElementById('submit-button')

// needs to be added in the front end.
// const storeName = document.getElementById();

const coordinates = [];

// async function addStore(e) {
//     e.preventDefault();

// }

button.addEventListener("click", myFunction);

async function myFunction() {

    const printCoordinated = async (position) => {
        const { latitude, longitude } = await position.coords;
        coordinates.push(latitude)
        coordinates.push(longitude);
    }

    navigator.geolocation.getCurrentPosition(printCoordinated, console.log);
}


async function addStore(e) {
    e.preventDefault();

    if (username === '' || number.value === '') {
        alert('Please fill the form details');
    }

    const sendBody = {
        storeName: username.value,
        number: number.value,
        coordinates: coordinates,
    };

    console.log(sendBody);

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        })

        if (res.status === 400) {
            throw Error('store already exists');
        }

        alert('Store added !');
        // window.location.href('../index.htm')

    } catch (err) {
        alert(err);
        return;
    }
}


donorSubmit.addEventListener('click', addStore);

