import axios from 'axios'
let local_url = 'http://127.0.0.1:8000/'

export const getSidebarPlayers = () => {
    axios.get(local_url + 'enemies/sidebar/', {/* Parameter to send */ })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            console.log('brian')
            // always executed
        });
}

export const updateSidebarPlayers = (enemyPlayed, enemyTracker) => {
    axios.get(local_url + 'enemies/update/', {/* Parameter to send */ })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

export const getEnemyAgainst = () => {
    axios.get(local_url + 'enemies/gameboard/', {/* Parameter to send */ })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}