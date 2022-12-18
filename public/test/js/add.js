const button = document.getElementById('button1')
const firstName = document.getElementById('validationCustom01');
const lastName = document.getElementById('validationCustom02');
const number = document.getElementById('validationCustomNumber');
const zipcode = document.getElementById('validationCustom05');
const donorSubmit = document.getElementById('donor-submit');

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

    if (firstName.value === '' || lastName.value === '' || number.value === '' || zipcode.value === '') {
        alert('Please fill the form details');
    }

    const sendBody = {
        storeName: firstName.value,
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
        // window.location.href('./index.htm')
        window.location.href = "./index.html";
        console.log("Page redirected")

    } catch (err) {
        alert(err);
        return;
    }
}


donorSubmit.addEventListener('click', addStore);