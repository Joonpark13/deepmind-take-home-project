# AI Showcase - Deepmind Take-home Project

## Instructions

To run the app locally:

```
yarn
yarn start
```

(Must have node and yarn installed)

## Solution

The completed solution consists of a React SPA (Single Page Application) that allows users to search for a given AI agent, select an AI agent to view its average score for a given task category, and compare multiple AI agents' scores.

### Notable details

The application, as per the requirements, work well at any computer screen widths (laptop, desktop). The application is not optimized for mobile screen widths as a realistic version of this application would be for internal research use only.

The application is designed so that it is scalable to new task categories. No changes are required to the code if a brand new task category appears in the data. However, the time complexity of the resulting algorithm to calculate the average scores for a set of agents being compared is O(agents * (tasks + categories)). For an initial implementation, this is acceptable since the number of agents being compared at once is unlikely to be higher than a few (requirement specified 2), and the number of task categories is likely to be low as well (only 3 categories in the given test data). If the number of task score entries grows very large and possible performance issues begin to appear, this is a spot that could be further optimized.

The application's comparison view also scales to allow the researcher to compare more than 2 AI agents' scores at once.

### Possible improvements

With more time, I would have implemented the following additional features and optimizations:

- An interface that allows the researchers to see scores for individual tasks, not just scores for a task category average.
- Debouncing the search requests so that it does not fire on every keypress. Currently, a search request fires on every keypress, meaning differing simulated response times can lead to a bug where the user sees the responses for a stale query after they have stopped typing. Debouncing the search request would address this issue.

For a realistic application, I would have:

- Implemented a cache of agent data so that users would see performance gains on subsequent searches/views.
- Held a denormalized map of agent data (key = agent id) in application level state to enable quick access of agent data from any part of the application. If the application were of realistic production size, an application level state management solution would have also been employed, which would have been the most appropriate place to store this map.
- Implemented both unit and integration tests for increased feature confidence and regression prevention.
