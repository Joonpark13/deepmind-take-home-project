import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import green from '@material-ui/core/colors/green';

const BAR_WIDTH = 280;

const useStyles = makeStyles({
  scoreBar: {
    width: BAR_WIDTH,
    height: 20,
    backgroundColor: 'lightgray',
    marginRight: 8,
  },
  scoreBarFill: {
    width: ({ score }) => BAR_WIDTH * (score / 100),
    height: '100%',
    backgroundColor: green[500],
  },
  highlight: {
    fontWeight: 'bold',
    color: green[500],
  },
});

export default function ScoreBar({ agentName, score, isBest }) {
  const styles = useStyles({ score, isBest });

  return (
    <Box display="flex">
      <Box width={100}>
        <Typography variant="body1" className={isBest ? styles.highlight : undefined}>
          {agentName}
        </Typography>
      </Box>
      <div className={styles.scoreBar}>
        <div className={styles.scoreBarFill} />
      </div>
      <Typography variant="body1" className={isBest ? styles.highlight : undefined}>
        {Math.round(score)}%
      </Typography>
    </Box>
  );
}
