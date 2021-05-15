import { useState } from 'react';
import { AppBar, Box, CircularProgress, Divider, FormControlLabel, FormGroup, Switch, TextField, Toolbar, Typography } from '@material-ui/core';
import ListMessage from './ListMessage';
import AgentDisplay from './AgentDisplay';
import AgentComparisonDisplay from './AgentComparisonDisplay';
import AgentsList from './AgentsList';
import { AgentsApi } from './agents-api';
import { useAgents } from './hooks';
import { getOnlySelectedAgentId } from './util';

const api = new AgentsApi();

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedAgentIds, setSelectedAgentIds] = useState(new Set());
  const [agents, isLoading, error] = useAgents(api, searchInput, () => setSelectedAgentIds(new Set()));
  const [compareMode, setCompareMode] = useState(false);

  function handleCompareModeChange() {
    setSelectedAgentIds(new Set());
    setCompareMode(!compareMode);
  }

  const onlySelectedAgentId = getOnlySelectedAgentId(selectedAgentIds);

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
              <AgentsList
                agents={agents}
                compareMode={compareMode}
                selectedAgentIds={selectedAgentIds}
                setSelectedAgentIds={setSelectedAgentIds}
              />
            )}
          </Box>
        </div>

        {!compareMode && selectedAgentIds.size === 1 && (
          <AgentDisplay agent={agents.find(agent => agent.id === onlySelectedAgentId)} />
        )}
        {compareMode && selectedAgentIds.size >= 1 && (
          <AgentComparisonDisplay agents={agents.filter(agent => selectedAgentIds.has(agent.id))} />
        )}
      </Box>
    </div>
  );
}

export default App;
