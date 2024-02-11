let tasks_arr = "";
let suggestion_arr = "";


document.addEventListener('DOMContentLoaded', function() {
  if (window.localStorage.getItem("tasks"))
  {
    tasks_arr = window.localStorage.getItem("tasks");
    var item = "";
    for (var i = 0; i < tasks_arr.length; i++)
    {
      if (tasks_arr[i] === "," || i == tasks_arr.length-1)
      {
        if (i == tasks_arr.length - 1)
        {
          item = item.concat(tasks_arr[i])
        }
        const new_task = document.createElement('div');
        const task_value = item;
        const schedule_item = document.createTextNode(task_value);
        new_task.appendChild(schedule_item);
        document.getElementById('task_list').appendChild(new_task);
        item = "";
      }
      else
      {
        item = item.concat(tasks_arr[i]);
      }
    }
  }
  if (window.localStorage.getItem("suggestion"))
  {
    suggestion_arr = window.localStorage.getItem("suggestion");
    var item = "";
    for (var i = 0; i < suggestion_arr.length; i++)
    {
      if (suggestion_arr[i] === "," || i == suggestion_arr.length-1)
      {
        if (i == suggestion_arr.length - 1)
        {
          item = item.concat(suggestion_arr[i])
        }
        const new_suggestion = document.createElement('div');
        const suggestion_value = item;
        if (suggestion_value == "br")
        {
          const suggestion_item = document.createElement("br");
          new_suggestion.appendChild(suggestion_item);
        }
        else
        {
          const suggestion_item = document.createTextNode(suggestion_value);
          new_suggestion.appendChild(suggestion_item);
        }
        document.getElementById('suggestion_list').appendChild(new_suggestion);
        item = "";
      }
      else
      {
        item = item.concat(suggestion_arr[i]);
      }
    }
  }
   window.addEventListener("beforeunload", save_everything);
});

function save_everything()
{
  window.localStorage.setItem("tasks", tasks_arr);
  window.localStorage.setItem("suggestion", suggestion_arr);
}

function add_event()
{
  const new_task = document.createElement('div');
  const start_time = document.getElementById('start_time').value;
  const end_time = document.getElementById('end_time').value;
  const task_value = document.getElementById('task').value;
  const schedule_string = start_time.concat("-", end_time, ": ", task_value);
  tasks_arr = tasks_arr.concat(",", schedule_string);
  const schedule_item = document.createTextNode(schedule_string);
  new_task.appendChild(schedule_item);
  document.getElementById('task_list').appendChild(new_task);
  evaluate_event();
}

function evaluate_event()
{
  const start_time = document.getElementById('start_time').value;
  const end_time = document.getElementById('end_time').value;
  const task_value = document.getElementById('task').value;
  var end_time_hour = end_time.split(":")[0];
  var start_time_hour = start_time.split(":")[0];
  if (end_time_hour > 12)
  {
    end_time_hour = end_time_hour - 12;
  }
  if (start_time_hour > 12)
  {
    start_time_hour = start_time_hour - 12;
  }
  
  // Conversions and evaluations
  end_time_minutes = parseInt(end_time_hour * 60) + parseInt(end_time.split(":")[1]);
  start_time_minutes = parseInt(start_time_hour * 60) + parseInt(start_time.split(":")[1]);
  time_for_activity = end_time_minutes - start_time_minutes;
  //Comparing time
  
  if (time_for_activity > 10)
  {
    if (task_value.includes("shower") || task_value.includes("bath"))
    {
      create_suggestion("shower");
    }
    else 
    {
      create_suggestion("no suggestion");
    }
  }
  else 
  {
    create_suggestion("no suggestion");
  }
}

function create_suggestion(activity)
{
  const new_suggestion = document.createElement('div');
  var suggestion_value;
  if (activity.includes("shower") || activity.includes("bath"))
  {
    suggestion_arr = suggestion_arr.concat(",", "Try to limit your shower time!");
    suggestion_value = document.createTextNode("Try to limit your shower time!");
  }
  else 
  {
    suggestion_arr = suggestion_arr.concat(",", "br");
    suggestion_value = document.createElement("br");
  }
  new_suggestion.appendChild(suggestion_value);
  document.getElementById('suggestion_list').appendChild(new_suggestion);
}

function clear_all() 
{
  tasks_arr = "";
  suggestion_arr = "";
  console.log("clearing...");
  window.localStorage.setItem("tasks", tasks_arr);
}