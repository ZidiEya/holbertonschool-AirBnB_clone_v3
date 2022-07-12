// Import the JavaScript static/scripts/2-hbnb.js in the <head> tag (instead of 1-hbnb.js)
document.addEventListener('DOMContentLoaded', () => {
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
        const response = await fetch("http://localhost:5001/api/v1/status");
        const data = await response.json();
        if (data.status !== 'OK') {
            let elemento = document.getElementById('api_status')
            elemento.className = ''
        }
    }
    apiStatus();
});
