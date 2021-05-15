import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'css-percentage-circle/css/circle.css';

const useStyles = makeStyles({
  taskScore: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function TaskScoreCard({ categoryName, score }) {
  const styles = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{categoryName}</Typography>

        <div className={`c100 p${Math.round(score)} green`}>
          <span className={styles.taskScore}>{Math.round(score)}%</span>
          <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
          </div>
      </div>
      </CardContent>
    </Card>
  );
}
