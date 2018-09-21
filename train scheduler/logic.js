var config = {
    apiKey: "AIzaSyDl6haYUbMD_OwcolrjXBv0LTlBEUmNJaM",
    authDomain: "testproject-f0daa.firebaseapp.com",
    databaseURL: "https://testproject-f0daa.firebaseio.com",
    projectId: "testproject-f0daa",
    storageBucket: "testproject-f0daa.appspot.com",
    messagingSenderId: "275146301321"
  };
  
  firebase.initializeApp(config);

  var database= firebase.database();


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var newName = $("#name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var newTime = moment($('#time-input').val().trim(),"HH:mm").format("X");
    
    var newFreq = $("#frequency-input").val().trim();
    
    console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
  

    var newTrain ={
    name: newName,
    destination: newDestination,
    time: newTime,
    frequency: newFreq
    };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
       
    alert("Train added");

    $("#name-input").val("");
    $("#time-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    });

    database.ref().on("child_added", function(childSnapshot) {
      // var updateButton = $("<button>").html("<span class='glyphicon glyphicon-edit'></span>").addClass("updateButton").attr("data-index", index).attr("data-key", childSnapshot.key);
  	  // var removeButton = $("<button>").html("<span class='glyphicon glyphicon-remove'></span>").addClass("removeButton").attr("data-index", index).attr("data-key", childSnapshot.key);
    console.log(childSnapshot.val());

    var newName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFreq = childSnapshot.val().frequency;

    console.log(newName);
    console.log(newDestination);
    console.log(newTime);
    console.log(newFreq);

  
  var newRow = $("<tr>").append(
    $("<td>").text(newName),
    $("<td>").text(newDestination),
    $("<td>").text(newFreq),
    $("<td>").text(newTime),
    
  );


  $("#train-table > tbody").append(newRow);
});
var currentTime = moment();
var counter = setInterval(refreshTable, 60*1000);
// Update the Current Time every second
var timeStep = setInterval(currentTime, 1000);

function currentTime(){
  var timeNow = moment().format("hh:mm:ss A");
  $("#current-time").text(timeNow);

  // Refresh the Page every minute, on the minute
  var secondsNow = moment().format("ss");

  if(secondsNow == "00"){
    refreshTable();
  }

}


  