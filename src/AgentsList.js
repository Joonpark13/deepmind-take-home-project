import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { getOnlySelectedAgentId } from './util';

export default function AgentsList({ agents, compareMode, selectedAgentIds, setSelectedAgentIds }) {
  const onlySelectedAgentId = getOnlySelectedAgentId(selectedAgentIds);

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

  return (
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
  );
}

function removeFromSetAndGetNewSet(set, value) {
  return new Set([...set].filter(setValue => setValue !== value));
}

function addToSetAndGetNewSet(set, value) {
  return new Set(set.add(value))
}
