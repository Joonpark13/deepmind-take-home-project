import { Card, CardContent, Typography } from '@material-ui/core';
import 'css-percentage-circle/css/circle.css';
import './TaskScoreCard.css';

export default function TaskScoreCard({ categoryName, score }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{categoryName}</Typography>

        <div className={`c100 p${Math.round(score)} green`}>
          <span className="task-score">{score}%</span>
          <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
          </div>
      </div>
      </CardContent>
    </Card>
  );
}