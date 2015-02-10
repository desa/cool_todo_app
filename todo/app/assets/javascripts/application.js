// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
// wait for window load
$(function () {
	var userId = window.location.pathname.split('/')[2];
	var usersTasksURL = "/users/"+ userId + "/tasks.json";

	var $tasksCon = $("#tasks-con");

    $.get(usersTasksURL)
      .done(function (tasks) {
      	tasks.forEach(function(task){
      		var taskClass = 'class="task-' + task.id + '"';
      		var $taskContent = $("<div " + taskClass + ">" + task.content + "</div>");
      		var isChecked = task.complete ? "checked" : "";
      		var $taskComplete = $("<input type='checkbox' class='complete'" + isChecked + "/>");
      		var $taskDelete = $("<button class='delete'>Delete</button>");
      		var $task = $taskContent.append($taskComplete).append($taskDelete);
      		console.log(task);
      		$tasksCon.append($task);
      	});
      	watchForDeletes();
      	watchForTaskCompleteUpdates();
        console.log("All Todos:", tasks);
      });


	var $taskForm = $("#task-form");
	var $taskContent = $("#content");

	$taskForm.on("submit", function (event) {
		event.preventDefault();
		var content = $taskContent[0].value;
		console.log(content);
		var obj = {task: {content: content}};
		$.post(usersTasksURL, obj, function(task){
			console.log(task);
			var taskClass = 'class="task-' + task.id + '"';
      		var $taskContent = $("<div " + taskClass + ">" + task.content + "</div>");
      		var isChecked = task.complete ? "checked" : "";
      		var $taskComplete = $("<input type='checkbox' class='complete'" + isChecked + "/>");
      		var $taskDelete = $("<button class='delete'>Delete</button>");
      		var $task = $taskContent.append($taskComplete).append($taskDelete);
      		$tasksCon.append($task);
      		$taskContent[0].value = "";
      		watchForDeletes();
      		watchForTaskCompleteUpdates();
		});
    	//console.log($(this).serialize());
	});

	var watchForDeletes = function(){
		var $deletes = $('.delete');

		$deletes.click(function(event){
			console.log(event);
			event.preventDefault();
			var $task = event.toElement.parentElement;
			var taskId = $task.classList[0].split("-")[1];
			var usersTaskURL = "/users/"+ userId + "/tasks/" + taskId + ".json";
			console.log(usersTaskURL);

			var deleteObj = {method: "DELETE", url: usersTaskURL};	

			$.ajax(deleteObj).done(function(task){
				console.log(task);
				$task.remove();
			});
		});
	};

	var watchForTaskCompleteUpdates = function() {
		var $completes = $('.complete');

		$completes.click(function(event){
			console.log(event);
			var $checkbox = event.toElement;
			var $task = $checkbox.parentElement;
			var taskId = $task.classList[0].split("-")[1];
			var usersTaskURL = "/users/"+ userId + "/tasks/" + taskId + ".json";
			var checked = $checkbox.checked;

			var patchObj = {method: "PATCH", url: usersTaskURL, data: {task: {complete: checked}}};
			$.ajax(patchObj).done(function(task){
				console.log(task);
			});
		});
	};
});