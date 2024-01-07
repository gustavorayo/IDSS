// CurricularUnits1stSemester.js

import React from 'react';
import { TextField, Grid, Box, Stack } from '@mui/material';

const CurricularUnits1stSemester = ({ values, handleChange }) => {
  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Credited (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.credited"
            type="number"
            inputProps={{ min: 0, max: 999 }}
            value={values.curricularUnits1stSem.credited}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Enrolled (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.enrolled"
            type="number"
            inputProps={{ min: 0, max: 999 }}
            value={values.curricularUnits1stSem.enrolled}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Evaluations (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.evaluations"
            type="number"
            inputProps={{ min: 0, max: 999 }}
            value={values.curricularUnits1stSem.evaluations}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Approved (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.approved"
            type="number"
            inputProps={{ min: 0, max: 999 }}
            value={values.curricularUnits1stSem.approved}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Grade (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.grade"
            type="text"
            value={values.curricularUnits1stSem.grade}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Without Evaluations (1st Sem)"
            fullWidth
            name="curricularUnits1stSem.withoutEvaluations"
            type="number"
            inputProps={{ min: 0, max: 999 }}
            value={values.curricularUnits1stSem.withoutEvaluations}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CurricularUnits1stSemester;
