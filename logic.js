
var config = {
    apiKey: "AIzaSyB9HZSlFNTGP8Xs2OGURPo2sf3lqkPp52k",
    authDomain: "in-class-work.firebaseapp.com",
    databaseURL: "https://in-class-work.firebaseio.com",
    projectId: "in-class-work",
    storageBucket: "in-class-work.appspot.com",
    messagingSenderId: "309681733564"
};
firebase.initializeApp(config);


var database = firebase.database();
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";


$("#submit").on("click", function (event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    trainTime = $("#train-time").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainTime: trainTime

    });
});
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    trainTime = snapshot.val().trainTime;


    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    trainTime = moment(nextTrain).format("hh:mm");

    //setTimeout(function () {
    // location.reload();
    // }, 30000);
    // if (tMinutesTillTrain = 0){
    //   alert("Train is Here!")
    // }




    $("tbody").append($("<tr>")).append("<td>" + trainName + "</td>").append("<td>" + destination + "</td>").append("<td>" + frequency + "</td>").append("<td>" + trainTime + "</td>").append("<td>" + tMinutesTillTrain + "</td>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

