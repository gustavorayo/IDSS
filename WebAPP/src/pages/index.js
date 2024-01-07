import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PredictorForm } from 'src/sections/predictor/basic-form';

const Page = () => (
  <>
    <Head>
      <title>
        Student Evaluation
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} maxWidth="lg">
          <div>
            <Typography variant="h4">
              Student Evaluation
            </Typography>
          </div>
          <div>
          <PredictorForm />
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
