import React from 'react';
import { TextField, Grid, Box, Typography, Slider } from '@mui/material';

const SurveyForm = ({ formData, handleInputChange }) => {
  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Grid container spacing={3}>

        {/* Question 1 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            How motivated does the student appear to be regarding higher education?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.motivation}
            marks
            min={1}
            max={10}
            name="survey.motivation"
            onChange={(event, value) => handleInputChange(event, 'survey.motivation', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.motivation}</Typography>
        </Grid>

        {/* Question 2 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            How would you rate the student&#39;s curiosity and intellectual engagement?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.curiosity}
            marks
            min={1}
            max={10}
            name="survey.curiosity"
            onChange={(event, value) => handleInputChange(event, 'survey.curiosity', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.curiosity}</Typography>
        </Grid>

        {/* Question 3 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            How effectively does the student communicate their thoughts and ideas?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.communication}
            marks
            min={1}
            max={10}
            name="survey.communication"
            onChange={(event, value) => handleInputChange(event, 'survey.communication', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.communication}</Typography>
        </Grid>

        {/* Question 4 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            To what extent does the student demonstrate problem-solving skills and critical thinking?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.problemSolving}
            marks
            min={1}
            max={10}
            name="survey.problemSolving"
            onChange={(event, value) => handleInputChange(event, 'survey.problemSolving', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.problemSolving}</Typography>
        </Grid>

        {/* Question 5 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            How adaptable and open-minded does the student seem when faced with new challenges or ideas?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.adaptability}
            marks
            min={1}
            max={10}
            name="survey.adaptability"
            onChange={(event, value) => handleInputChange(event, 'survey.adaptability', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.adaptability}</Typography>
        </Grid>

        {/* Question 6 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Does the student exhibit any signs of leadership potential or the ability to work well in a team?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.leadership}
            marks
            min={1}
            max={10}
            name="survey.leadership"
            onChange={(event, value) => handleInputChange(event, 'survey.leadership', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.leadership}</Typography>
        </Grid>

        {/* Question 7 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            How well does the student interact with peers and adults in a social or professional setting?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.interpersonalSkills}
            marks
            min={1}
            max={10}
            name="survey.interpersonalSkills"
            onChange={(event, value) => handleInputChange(event, 'survey.interpersonalSkills', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.interpersonalSkills}</Typography>
        </Grid>

        {/* Question 8 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Does the student express a clear passion for the chosen field of study?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.passionForField}
            marks
            min={1}
            max={10}
            name="survey.passionForField"
            onChange={(event, value) => handleInputChange(event, 'survey.passionForField', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.passionForField}</Typography>
        </Grid>

        {/* Question 9 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            To what extent does the student take initiative in pursuing academic or extracurricular interests?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.personalInitiative}
            marks
            min={1}
            max={10}
            name="survey.personalInitiative"
            onChange={(event, value) => handleInputChange(event, 'survey.personalInitiative', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.personalInitiative}</Typography>
        </Grid>

        {/* Question 10 */}
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            Considering all aspects, how would you rate the student&#39;s overall potential for success in higher education?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Slider
            value={formData.survey.overallPotential}
            marks
            min={1}
            max={10}
            name="survey.overallPotential"
            onChange={(event, value) => handleInputChange(event, 'survey.overallPotential', value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>{formData.survey.overallPotential}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurveyForm;
