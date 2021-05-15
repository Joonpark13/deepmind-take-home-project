import { Box } from "@material-ui/core"

export default function DisplayContainer({ children }) {
  return (
    <Box width="100%">
      <Box maxWidth={1200} width="100%" margin="auto" padding={3} >
        {children}
      </Box>
    </Box>
  );
}