export function getTaskAveragesByCategory(tasks) {
  const tasksByCategory = {};
  tasks.forEach(task => {
    if (tasksByCategory.hasOwnProperty(task.category)) {
      tasksByCategory[task.category].push(task);
    } else {
      tasksByCategory[task.category] = [task];
    }
  });

  const taskAverages = {};
  Object.keys(tasksByCategory).forEach(category => {
    taskAverages[category] = average(tasksByCategory[category].map(task => task.score));
  });
  return taskAverages;
}

function average(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
