import { Box, Container, Grid } from "@mui/material";
import Pricing from "../../components/Pricing";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function NewStore() {
  return (
    <Container>
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Select Plan</StepLabel>
        </Step>
        <Step>
          <StepLabel>Store details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Grid>
          <Grid></Grid>
          <Grid></Grid>
        </Grid>
        <Pricing />
      </Box>
    </Container>
  );
}
export default NewStore;
