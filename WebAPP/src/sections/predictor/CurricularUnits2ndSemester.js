// CurricularUnits2ndSemester.js

import React from 'react';
import { TextField, Grid } from '@mui/material';

const CurricularUnits2ndSemester = ({ values, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <TextField
          label="Credited (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.credited"
          type="number"
          inputProps={{ min: 0, max: 999 }}
          value={values.curricularUnits2ndSem.credited}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Enrolled (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.enrolled"
          type="number"
          inputProps={{ min: 0, max: 999 }}
          value={values.curricularUnits2ndSem.enrolled}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Evaluations (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.evaluations"
          type="number"
          inputProps={{ min: 0, max: 999 }}
          value={values.curricularUnits2ndSem.evaluations}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Approved (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.approved"
          type="number"
          inputProps={{ min: 0, max: 999 }}
          value={values.curricularUnits2ndSem.approved}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Grade (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.grade"
          type="text"
          value={values.curricularUnits2ndSem.grade}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Without Evaluations (2nd Sem)"
          fullWidth
          name="curricularUnits2ndSem.withoutEvaluations"
          type="number"
          inputProps={{ min: 0, max: 999 }}
          value={values.curricularUnits2ndSem.withoutEvaluations}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CurricularUnits2ndSemester;
