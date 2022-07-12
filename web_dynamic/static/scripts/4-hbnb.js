document.addEventListener('DOMContentLoaded', () => {
    // see the  checkboxes that are cheked and storage in a list. 
    const checked_list = {};
    const checkbox = document.querySelectorAll('input[type=checkbox]').forEach(function (checks) {
        checks.addEventListener("change", function () {
            if (this.checked) {
                checked_list[checks.getAttribute('data-id')] = checks.getAttribute('data-name');
            }
            else {
                delete checked_list[checks.getAttribute('data-id')];
            }
            document.querySelector(".amenities h4").textContent = Object.values(checked_list).join(', ');
        });
    });

    async function apiStatus(){
        try {
            const response = await fetch("http://localhost:5001/api/v1/status");
            const data = await response.json();
            console.log(data.status);
            if (data.status !== 'OK') {
                let elemento = document.getElementById('api_status')
                elemento.className = ''
            }
        } catch(e) {
            console.log(e)
        }
    }
    apiStatus();
    async function fetchPlaces() {
        var xhr = new XMLHttpRequest();
        xhr.onloadend = function () {
            if (!xhr.responseText && xhr.readyState !== 'complete') return
            const result = JSON.parse(xhr.responseText) 
            const [places] = document.getElementsByClassName('places')
            places.innerHTML = " "
            for (const place of result) {
                const places_html = [
                    `<article>`,
                    `<div class="title_box">`,
                    `<h2>${place.name}</h2>`,
                    `<div class="price_by_night"> $ ${ place.price_by_night }</div>`,
                    `</div>`,
                    `<div class="information">`,
                    `<div class="max_guest"> <div class="guest_image"></div>${ place.max_guest } Guest(s)</div>`,
                    `<div class="number_rooms">  <div class="bed_image"></div>${ place.number_rooms } Bedroom(s)</div>`,
                    `<div class="number_bathrooms"><div class="bath_image"></div>${ place.number_bathrooms } Bathroom(s)</div>`,
                    `</div>`,
                    `<div class="description">`,
                    `${ place.description }`,
                    `</div>`,
                    `</article>`,]
                places.innerHTML += places_html.join('')            
            }
        }
        xhr.open("POST", 'http://localhost:5001/api/v1/places_search', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({}));
    }
    const button_filter = document.getElementById("button_filter");
    button_filter.addEventListener("click", fetchPlaces);
});
