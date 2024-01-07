import React from 'react';
import { Avatar, Card, CardContent, Stack, Snackbar, SvgIcon,Alert, Typography, Grid,CardHeader
 } from '@mui/material';

const Results = ({response}) => {
  const {model_result, survey, image, weighted_mean, applied_wights} = response;

    const showAlert = () => {
    if (model_result == 1) {
      return (
          <Alert severity="success"> The student is predicted to graduate</Alert>
      );
    } else if (model_result == 0) {
      return (
          <Alert severity="warning">The student is predicted to drop out</Alert>
      );
    } else {
      return <h4>Please complete the form to make the prediction</h4>
    }
  };

   const showAlert1 = () => {
    if (weighted_mean >= 5) {
      return (
          <Alert severity="success"> The student is predicted to graduate ({weighted_mean}/10)</Alert>
      );
    } else if (weighted_mean < 5) {
      return (
          <Alert severity="warning">The student is predicted to drop out ({weighted_mean}/10)</Alert>
      );
    } else {
      return <></>
    }
  };



return (
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <Card>
        <CardHeader title="Model Prediction" />
        <CardContent>
          {showAlert()}
        </CardContent>
      </Card>
      </Grid>
      <Grid item xs={6}>
      <Card>
        <CardHeader title="Professor Evaluation" />
        <CardContent>
          <Typography variant="h4">
            {survey}
          </Typography>
        </CardContent>
      </Card>
      </Grid>

      <Grid item xs={6}>
      <Card>
        <CardHeader title="Joined Prediction" />
                <Alert
                  color="primary"
                  severity="info"
                >
                {applied_wights &&
                  <div>
                     Result influence. Model: {applied_wights.model}%, professor: {applied_wights.professor}
                  </div>}
                </Alert>
        <CardContent>

          <Typography variant="h4">
            {showAlert1()}
          </Typography>
        </CardContent>
      </Card>
      </Grid>
    </Grid>
  );
};

export default Results;