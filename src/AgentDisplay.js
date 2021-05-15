import { Box, Typography } from "@material-ui/core";
import TaskScoreCard from './TaskScoreCard';

export default function AgentDisplay({ agent }) {
  const taskAverages = getTaskAveragesByCategory(agent.tasks);

  return (
    <Box padding={3} maxWidth={1200} width="100%" margin="auto">
      <Typography variant="h4" component="h3" gutterBottom>{agent.name}</Typography>
      <Typography variant="subtitle1">{agent.description}</Typography>

      <Box display="flex" padding={3} justifyContent="space-around">
        {Object.entries(taskAverages).map(([taskCategory, score]) => (
          <TaskScoreCard key={taskCategory} categoryName={taskCategory} score={Math.round(score)} />
        ))}
      </Box>
    </Box>
  );
}

function getTaskAveragesByCategory(tasks) {
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
