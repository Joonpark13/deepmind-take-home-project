import { Typography, Box } from '@material-ui/core';
import DisplayContainer from './DisplayContainer';
import TaskScoreComparisonCard from './TaskScoreComparisonCard';
import { getTaskAveragesByCategory } from './util';

export default function AgentComparisonDisplay({ agents }) {
  const categoryScoresByAgent = {};
  const tasks = new Set();
  agents.forEach(agent => {
    const averagesByCategory = getTaskAveragesByCategory(agent.tasks);
    categoryScoresByAgent[agent.id] = averagesByCategory;
    Object.keys(averagesByCategory).forEach(category => tasks.add(category));
  });
  const agentScoresByCategory = {};
  tasks.forEach(task => {
    agentScoresByCategory[task] = {};
    Object.entries(categoryScoresByAgent).forEach(([agentId, categoryScores]) => {
      agentScoresByCategory[task][agentId] = categoryScores[task];
    });
  });

  return (
    <DisplayContainer>
      <Typography variant="h4" component="h3" gutterBottom>Comparing</Typography>
      <Typography variant="h6" component="h5" display="inline" gutterBottom>
        {agents.map(agent => agent.name).join(', ')}
      </Typography>

      <Box display="flex" flexWrap="wrap" padding={3}>
        {Object.keys(agentScoresByCategory).map(category => (
          <Box key={category} marginBottom={2} marginRight={2}>
            <TaskScoreComparisonCard
              task={category}
              scoresByAgent={agentScoresByCategory[category]} 
              agents={agents}
            />
          </Box>
        ))}
      </Box>
    </DisplayContainer>
  );
}