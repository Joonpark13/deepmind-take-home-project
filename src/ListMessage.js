import { Box, Typography } from '@material-ui/core';

export default function ListMessage({ children }) {
  return (
    <Box padding={1}>
      <Typography variant="body1">
        {children}
      </Typography>
    </Box>
  );
}