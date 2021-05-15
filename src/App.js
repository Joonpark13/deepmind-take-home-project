import { useState } from 'react';
import { AppBar, Box, CircularProgress, Divider, List, ListItem, ListItemText, TextField, Toolbar, Typography } from '@material-ui/core';
import { AgentsApi } from './agents-api';
import { useAgents } from './hooks';
import ListMessage from './ListMessage';

const api = new AgentsApi();

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [agents, isLoading, error] = useAgents(api, searchInput);

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

          <Box paddingX={2} paddingBottom={2}>
            <TextField
              label="Search" 
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Divider />

          <Box width={320}>
            {isLoading && (
              <Box display="flex" justifyContent="center" padding={2}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <ListMessage>
                There was an error loading the agents. Please try reloading.
              </ListMessage>
            )}
            {!isLoading && !error && agents.length === 0 && (
              <ListMessage>
                No matches found.
              </ListMessage>
            )}
            {!isLoading && !error && agents.length > 0 && (
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
            )}
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default App;
