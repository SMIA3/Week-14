var APP_ID = "ECA515B0-0525-1FB6-FFBC-C94126882200";
var API_KEY = "23531790-6BBA-01BD-FF79-F815D2B39300";
 
Backendless.initApp(APP_ID, API_KEY);

$(document).on("pageshow","#todoPage", onPageShow);

function onPageShow() {
    Backendless.Data.of("TASKS").find().then(processResults).catch(error);
}

function processResults(tasks) {
    //wipe the list clean
    $("#taskList").empty();

    //add each task
    for (var i = 0; i < tasks.length; i++) {
        $("#taskList").append("<li>"+tasks[i].Task+"</li>");
    }

    //refresh the listview
    $("#taskList").listview("refresh");
}


function error(err) {
    alert(err);
}

$(document).on("click", "#addTaskButton", onAddTask);

function onAddTask() {
    //console.log("Clicked");
    var tasktext = $('#addTaskText').val();
    
    var newTask = {};
    newTask.Task = tasktext;
    
    Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);
}

function saved(savedTask) {
    console.log("new contact instance has been saved" + savedTask);
    Backendless.Data.of("TASKS").find().then(processResults).catch(error);
}