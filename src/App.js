import { useState } from 'react';
import { AppBar, Box, Checkbox, CircularProgress, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemIcon, ListItemText, Switch, TextField, Toolbar, Typography } from '@material-ui/core';
import { AgentsApi } from './agents-api';
import { useAgents } from './hooks';
import ListMessage from './ListMessage';
import AgentDisplay from './AgentDisplay';

const api = new AgentsApi();

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedAgentIds, setSelectedAgentIds] = useState(new Set());
  const [agents, isLoading, error] = useAgents(api, searchInput, () => setSelectedAgentIds(new Set()));
  const [compareMode, setCompareMode] = useState(false);

  function handleAgentClick(agentId) {
    if (!compareMode) {
      setSelectedAgentIds(new Set([agentId]));
    } else if (selectedAgentIds.has(agentId)) {
      // Must initialize a new set to give React a new reference, otherwise React will not rerender.
      setSelectedAgentIds(removeFromSetAndGetNewSet(selectedAgentIds, agentId));
    } else {
      // Must initialize a new set to give React a new reference, otherwise React will not rerender.
      setSelectedAgentIds(addToSetAndGetNewSet(selectedAgentIds, agentId));
    }
  }

  function handleCompareModeChange() {
    setSelectedAgentIds(new Set());
    setCompareMode(!compareMode);
  }

  const onlySelectedAgentId = selectedAgentIds.values().next().value;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">AI Showcase</Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex">
        <div>
          <Box padding={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2">AI Agents</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={compareMode} onChange={handleCompareModeChange} />}
                label="Compare"
              />
            </FormGroup>
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
                    dense={compareMode}
                    selected={selectedAgentIds.size === 1 && onlySelectedAgentId === agent.id}
                    onClick={() => handleAgentClick(agent.id)}
                  >
                    {compareMode && (
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedAgentIds.has(agent.id)}
                          disableRipple
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={agent.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </div>

        {!compareMode && selectedAgentIds.size === 1 && (
          <AgentDisplay agent={agents.find(agent => agent.id === onlySelectedAgentId)} />
        )}
      </Box>
    </div>
  );
}

function removeFromSetAndGetNewSet(set, value) {
  return new Set([...set].filter(setValue => setValue !== value));
}

function addToSetAndGetNewSet(set, value) {
  return new Set(set.add(value))
}

export default App;
