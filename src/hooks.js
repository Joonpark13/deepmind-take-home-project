import { useState, useEffect } from 'react';

export function useAgents(agentsApi) {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (agentsApi) {
        setIsLoading(true);
        try {
          const response = await agentsApi.listAgents();
          setAgents(response);
        } catch(err) {
          setError(err);
        }
        setIsLoading(false);
      }
    })();
  }, [agentsApi]);

  return [agents, isLoading, error];
}
