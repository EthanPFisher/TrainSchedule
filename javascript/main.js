
var name;
var dest;
var firstTime;
var freq;



var config = {
    apiKey: "AIzaSyAngZCQUbgxu64yG7pD4SGsd_7tH80Q7cI",
    authDomain: "trainschedule-6d1ed.firebaseapp.com",
    databaseURL: "https://trainschedule-6d1ed.firebaseio.com",
    projectId: "trainschedule-6d1ed",
    storageBucket: "",
    messagingSenderId: "283243453402"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#submit-button").on("click", function (event) {
    event.preventDefault()

    name = $("#name-input").val()
    dest = $("#destination-input").val()
    firstTime = $("#first-time-input").val()
    freq = $("#frequency-input").val()

    $(".form-control").val("")

    database.ref().push({
        name: name,
        dest: dest,
        firstTime: firstTime,
        freq: freq
    })
})

database.ref().on("child_added", function (snapshot) {

    if (snapshot.child("name").exists() && snapshot.child("dest").exists() && snapshot.child("firstTime") && snapshot.child("freq")) {

        name = snapshot.val().name;
        dest = snapshot.val().dest;
        firstTime = snapshot.val().firstTime;
        freq = parseInt(snapshot.val().freq);

        if (freq === 0) {
            minutesAway = "Undefined"
            nextArrival = "Never"
        } else {
            var minutesAway = freq - (moment().diff(moment(firstTime, "HH:mm"), "minutes") % freq)
            var nextArrival = moment().add(minutesAway, "m").format("hh:mm a")
        }

        $("#tbody").append("<tr> <td>" + name + "</td> <td>" + dest + "</td> <td>" + freq + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td> </tr>");
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
