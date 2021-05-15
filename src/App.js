import { AppBar, Box, CircularProgress, Divider, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { AgentsApi } from './agents-api';
import { useAgents } from './hooks';

const api = new AgentsApi();

function App() {
  const [agents, isLoading, error] = useAgents(api);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">AI Showcase</Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex">
        <div>
          <Box padding={2}>
            <Typography variant="h6">AI Agents</Typography>
          </Box>
          <Divider />

          <Box width={320}>
            {isLoading && (
              <Box display="flex" justifyContent="center" padding={2}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Box padding={1}>
                <Typography variant="body1">
                  There was an error loading the agents. Please try reloading.
                </Typography>
              </Box>
            )}
            <List>
              {agents.map(agent => (
                <ListItem
                  key={agent.id}
                  button
                >
                  <ListItemText primary={agent.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default App;
