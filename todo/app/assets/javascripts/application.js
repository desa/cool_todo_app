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
var userId = window.location.pathname.split("/")[2];
var usersTasksURL = "/users/"+userId+"/tasks.json";

$.get(usersTasksURL)
.done(function(data) {
     var $container = $("<div class='container'>Container</div>");
     data.forEach(function(task) {
      var $content = $("<div style='color:pink;'>"+task.content+"</div>");
      var $complete = $("<div style='color:blue;'>"+task.complete+"</div>");
      var $created_at = $("<div style='color:green;'>"+task.created_at+"</div>");
      $complete.append($created_at);
      $content.append($complete);
      $container.append($content); 
    });
    $('body').append($container);
});

$('#task-form').submit(function(event) {
                 event.preventDefault();
                 var $content = $('#task-content');
                 console.log("submitted", $content.val());
                 
$.post(usersTasksURL, {task: {content: $content.val(), complete: false}})
  .done(function(task) {
     var $container = $('.container');
      var $content = $("<div style='color:pink;'>"+task.content+"</div>");
      var $complete = $("<div style='color:blue;'>"+task.complete+"</div>");
      var $created_at = $("<div style='color:green;'>"+task.created_at+"</div>");
      $complete.append($created_at);
      $content.append($complete);
      $container.append($content); 
     console.log(task);
  });
                 //Trigger Post Request
                 $content.val("");
                 $content.focus();
               });