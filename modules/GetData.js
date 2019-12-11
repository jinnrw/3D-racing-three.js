// export default function GetData() {
//     let namesArray = [];
    
//     fetch("leaderboard.json")
//         .then(
//             function (response) {
//                 if (response.status !== 200) {
//                     console.log('Looks like there was a problem. Status Code: ' +
//                         response.status);
//                     return;
//                 }

//                 response.json().then(function (data) {
//                     // namesArray = data;
//                     // console.log(namesArray);
//                     return data;
//                 });
//             }
//         )
//         .catch(function (err) {
//             console.log('Fetch Error :-S', err);
//         });



//     // fetch("nominations.json")
//     //     .then(response => response.json())
//     //     .then(json => console.log(json));


// }