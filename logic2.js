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
  var employeeName = "";
  var employeeRole = "";
  var startDate = 0;
  var monthsWorked = 0;
  var monthlyRate = 0;
  var totalBilled = 0;
  


  $("#submit-btn").on("click", function(){
      event.preventDefault();
       employeeName = $("<td>").append($("#employee-name").val().trim());
       employeeRole = $("<td>").append($("#role").val().trim());
       startDate =  $("<td>").append($("#date").val().trim());  
       monthlyRate =  $("<td>").append($("#rate").val().trim()); 
       monthsWorked =  $("<td>").append($("#role").val().trim());
      database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
        });
        database.ref().on("child_added", function(snapshot){
            employeeName = snapshot.val().employeeName;
            employeeRole = snapshot.val().employeeRole;
            startDate = snapshot.val().startDate;
            monthlyRate = snapshot.val().monthlyRate;

        })



      $("tbody").append($("<tr>")).append(employeeName).append(employeeRole).append(startDate).append(monthsWorked).append(monthlyRate);
  })

  