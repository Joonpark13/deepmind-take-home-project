import { useState } from 'react';
import { AppBar, Box, CircularProgress, Divider, List, ListItem, ListItemText, TextField, Toolbar, Typography } from '@material-ui/core';
import { AgentsApi } from './agents-api';
import { useAgents } from './hooks';
import ListMessage from './ListMessage';
import AgentDisplay from './AgentDisplay';

const api = new AgentsApi();

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedAgentIds, setSelectedAgentIds] = useState([]);
  const [agents, isLoading, error] = useAgents(api, searchInput, () => setSelectedAgentIds([]));
  const [compareMode, setCompareMode] = useState(false);

  function handleAgentClick(agentId) {
    if (!compareMode) {
      setSelectedAgentIds([agentId]);
    }
  }

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
            <Typography variant="h6" component="h2">AI Agents</Typography>
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
                    selected={selectedAgentIds.length === 1 && selectedAgentIds[0] === agent.id}
                    onClick={() => handleAgentClick(agent.id)}
                  >
                    <ListItemText primary={agent.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </div>

        {selectedAgentIds.length === 1 && (
          <AgentDisplay agent={agents.find(agent => agent.id === selectedAgentIds[0])} />
        )}
      </Box>
    </div>
  );
}

export default App;
