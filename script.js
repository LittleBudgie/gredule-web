function add_event()
{
  const new_task = document.createElement('div');
  const start_time = document.getElementById('start_time').value;
  const end_time = document.getElementById('end_time').value;
  const task_value = document.getElementById('task').value;
  const schedule_item = document.createTextNode(start_time.concat("-", end_time, ": ", task_value));
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
    suggestion_value = document.createTextNode("Try to limit your shower time!");
  }
  else 
  {
    console.log("reached");
    suggestion_value = document.createElement("br");
  }
  new_suggestion.appendChild(suggestion_value);
  document.getElementById('suggestion_list').appendChild(new_suggestion);
}
