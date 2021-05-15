import { useState, useEffect } from 'react';

export function useAgents(agentsApi, searchInput) {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (agentsApi) {
        setIsLoading(true);
        setError(null);
        try {
          let response;
          if (searchInput) {
            response = await agentsApi.searchAgents(searchInput);
          } else {
            response = await agentsApi.listAgents();
          }
          setAgents(response);
        } catch(err) {
          setError(err);
        }
        setIsLoading(false);
      }
    })();
  }, [agentsApi, searchInput]);

  return [agents, isLoading, error];
}
