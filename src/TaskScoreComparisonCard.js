import { Card, CardContent, Typography, Box } from '@material-ui/core';
import ScoreBar from './ScoreBar';

export default function TaskScoreComparisonCard({ task, scoresByAgent, agents }) {
  const bestScore = Math.max(...Object.values(scoresByAgent));
  return (
    <Box width={480}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>{task}</Typography>

          {Object.entries(scoresByAgent).map(([agentId, score]) => (
            <ScoreBar
              key={agentId}
              agentName={agents.find(agent => agent.id === parseInt(agentId, 10))?.name}
              score={score}
              // Multiple agents may have best scores, that is acceptable.
              isBest={score === bestScore}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
