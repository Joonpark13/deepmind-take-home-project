import { Box, Typography } from "@material-ui/core";
import DisplayContainer from './DisplayContainer';
import TaskScoreCard from './TaskScoreCard';
import { getTaskAveragesByCategory } from './util';

export default function AgentDisplay({ agent }) {
  const taskAverages = getTaskAveragesByCategory(agent.tasks);

  return (
    <DisplayContainer>
      <Typography variant="h4" component="h3" gutterBottom>{agent.name}</Typography>
      <Typography variant="subtitle1">{agent.description}</Typography>

      <Box display="flex" padding={3} justifyContent="space-around">
        {Object.entries(taskAverages).map(([taskCategory, score]) => (
          <TaskScoreCard key={taskCategory} categoryName={taskCategory} score={score} />
        ))}
      </Box>
    </DisplayContainer>
  );
}
