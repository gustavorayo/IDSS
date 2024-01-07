import { useCallback, useState } from 'react';
import axios from 'axios';  // Import axios
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurricularUnits1stSemester from './CurricularUnits1stSemester';
import CurricularUnits2ndSemester from './CurricularUnits2ndSemester';
import SurveyForm from './survey';
import Results from './results'


import {
  admissionOptions,
  maritalStatusOptions,
  educationLevelList,
  courses,
  educationLevels,
  motherOccupationList, fatherOccupationList,
  genderList,
  nationality,
  daytimeAttendance,
  models,
} from './lists';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Checkbox,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  FormControlLabel,
  Tab,
  Tabs,
  Unstable_Grid2 as Grid
} from '@mui/material';


export const PredictorForm = () => {
  const [values, setValues] = useState({
    maritalStatus: '1',
    applicationMode: '15',
    applicationOrder: '1',
    course: '9254',
    daytimeEveningAttendance: '1',
    previousQualification: '1',
    previousQualificationGrade: '160',
    nationality: '1',
    mothersQualification: '1',
    fathersQualification: '3',
    mothersOccupation: '4',
    fathersOccupation: '5',
    admissionGrade: '142.5',
    displaced: true,
    educationalSpecialNeeds: false,
    debtor: false,
    tuitionFeesUpToDate: false,
    gender: '1',
    scholarshipHolder: false,
    ageAtEnrollment: '19',
    international: false,
    curricularUnits1stSem: {
      credited: '0',
      enrolled: '6',
      evaluations: '6',
      approved: '6',
      grade: '14',
      withoutEvaluations: '0',
    },
    curricularUnits2ndSem: {
      credited: '0',
      enrolled: '6',
      evaluations: '6',
      approved: '6',
      grade: '13',
      withoutEvaluations: '0',
    },
    unemploymentRate: '10.8',
    inflationRate: '1.4',
    gdp: '1.74'
  });

  const [valuesSurvey, setValuesSurvey] = useState({
    survey: {
      motivation: 5,
      curiosity: 5,
      communication: 5,
      problemSolving: 5,
      adaptability: 5,
      leadership: 5,
      interpersonalSkills: 5,
      passionForField: 5,
      personalInitiative: 5,
      overallPotential: 5
    }
  });

  const [tabValue, setTabValue] = useState(0);
  const [modelValue, setModelValue] = useState(7);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSurveyChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const subFieldName = name.split('.')[1];
    setValuesSurvey((prevState) => ({
      ...prevState,
      survey: {
        ...prevState.survey,
        [subFieldName]: type === 'checkbox' ? checked : value,
      },
    }));
  }, []);

  const [serverResponse, setServerResponse] = useState({model: null, survey: 0});




  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith('curricularUnits1stSem')) {
      // Handle changes for curricularUnits1stSem separately
      const subFieldName = name.split('.')[1];
      setValues((prevState) => ({
        ...prevState,
        curricularUnits1stSem: {
          ...prevState.curricularUnits1stSem,
          [subFieldName]: type === 'checkbox' ? checked : value,
        },
      }));
    } else if (name.startsWith('curricularUnits2ndSem')) {
      // Handle changes for curricularUnits2ndSem separately
      const subFieldName = name.split('.')[1];
      setValues((prevState) => ({
        ...prevState,
        curricularUnits2ndSem: {
          ...prevState.curricularUnits2ndSem,
          [subFieldName]: type === 'checkbox' ? checked : value,
        },
      }));
    } else if (name.startsWith('survey')) {
      // Handle changes for curricularUnits2ndSem separately
      const subFieldName = name.split('.')[1];
      setValues((prevState) => ({
        ...prevState,
        survey: {
          ...prevState.survey,
          [subFieldName]: type === 'checkbox' ? checked : value,
        },
      }));
    }
    else {
      // Handle changes for other fields
      //console.log(name, value)
      setValues((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  }, []);



  const handleSubmit = useCallback(
    async (event) => {
      console.log("test")
      event.preventDefault();
      try {
        const data = { form: values, surveyForm: valuesSurvey, model:modelValue }
        console.log("Send values", data)
        // Make an HTTP POST request to your server endpoint with form data
        //const host = 'http://127.0.0.1:8000'
        const host = 'http://idss.eastus.cloudapp.azure.com:8000'
        const response = await axios.post(`${host}/predict`, data);

        setServerResponse(response.data);
        setTabValue(2) //go to results
        // Handle the response from the server as needed
        console.log('Server response:', response.data);
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error('Error submitting form:', error);
      }
    },
    [values, valuesSurvey, modelValue]
  );

  return (
    <Box>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardContent>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Student Information" />
            <Tab label="Professor Evaluation" />
            <Tab label="Results" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Card>
              <Box sx={{ m: 1 }}>
                <Grid
                  container
                  spacing={3}
                >
                <Grid
                container
                    xs={12}
                    md={12}
                  >
                <Grid
                    xs={6}
                    md={6}
                  >
                    <TextField
                      label="Model"
                      fullWidth
                      name="model"
                      select
                      required
                      value={modelValue}
                      SelectProps={{ native: true }}
                      onChange={(e)=> setModelValue(e.target.value)}
                    >
                      {models.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                    </Grid>
                  </Grid>

                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3} >
                    <TextField
                      label="Marital Status"
                      fullWidth
                      name="maritalStatus"
                      select
                      required
                      value={values.maritalStatus}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {maritalStatusOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue == 3 || modelValue >4 ) && <Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Application mode"
                      fullWidth
                      name="applicationMode"
                      required
                      select
                      value={values.applicationMode}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {admissionOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >6) &&<Grid xs={12} md={3}>
                    {/* TextField for applicationOrder */}
                    <TextField
                      label="Application Order"
                      fullWidth
                      name="applicationOrder"
                      type="number" // Set the type to number to allow only numeric input
                      inputProps={{ min: 0, max: 9 }} // Set the minimum and maximum values
                      value={values.applicationOrder}
                      onChange={handleChange}
                    />
                  </Grid> }

                  { (modelValue ==3 || modelValue >4) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Course"
                      fullWidth
                      name="course"
                      required
                      select
                      value={values.course}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {courses.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid> }

                  { (modelValue==3 || modelValue>4 ) &&<Grid xs={12} md={3}>
                    {/* TextField for daytimeEveningAttendance */}
                    <TextField
                      label="Daytime/Evening Attendance"
                      fullWidth
                      name="daytimeEveningAttendance"
                      select
                      required
                      value={values.daytimeEveningAttendance}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {daytimeAttendance.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}


                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Previous Qualification"
                      fullWidth
                      name="previousQualification"
                      required
                      select
                      value={values.previousQualification}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {educationLevels.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >0) &&<Grid xs={12} md={3}>
                    {/* TextField for applicationOrder */}
                    <TextField
                      label="Previous qualification (grade)"
                      fullWidth
                      name="previousQualificationGrade"
                      type="number" // Set the type to number to allow only numeric input
                      inputProps={{ min: 0, max: 200 }} // Set the minimum and maximum values
                      value={values.previousQualificationGrade}
                      onChange={handleChange}
                    />
                  </Grid>}

                  { (modelValue >1) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Nationality"
                      fullWidth
                      name="nationality"
                      required
                      select
                      value={values.nationality}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {nationality.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Mother's qualification"
                      fullWidth
                      name="mothersQualification"
                      required
                      select
                      value={values.mothersQualification}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {educationLevelList.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Father's qualification"
                      fullWidth
                      name="fathersQualification"
                      required
                      select
                      value={values.fathersOccupation}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {educationLevelList.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Mother's occupation"
                      fullWidth
                      name="mothersOccupation"
                      required
                      select
                      value={values.mothersOccupation}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {motherOccupationList.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >6) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Father's occupation"
                      fullWidth
                      name="fathersOccupation"
                      required
                      select
                      value={values.fathersOccupation}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {fatherOccupationList.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue >0) &&<Grid xs={12} md={3}>
                    {/* TextField for applicationOrder */}
                    <TextField
                      label="Admission grade"
                      fullWidth
                      name="admissionGrade"
                      type="number" // Set the type to number to allow only numeric input
                      inputProps={{ min: 0, max: 200 }} // Set the minimum and maximum values
                      value={values.admissionGrade}
                      onChange={handleChange}
                    />
                  </Grid>}

                  { (modelValue >6) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.displaced}
                          onChange={handleChange}
                          name="displaced"
                          color="primary"
                        />
                      }
                      label="Displaced"
                    />
                  </Grid>}

                  { (modelValue >2 && modelValue !=4 ) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.educationalSpecialNeeds}
                          onChange={handleChange}
                          name="educationalSpecialNeeds"
                          color="primary"
                        />
                      }
                      label="Educational special needs"
                    />
                  </Grid>}

                  { (modelValue ==4 || modelValue >5) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.debtor}
                          onChange={handleChange}
                          name="debtor"
                          color="primary"
                        />
                      }
                      label="Debtor"
                    />
                  </Grid>}

                  { (modelValue == 4 || modelValue >5) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.tuitionFeesUpToDate}
                          onChange={handleChange}
                          name="tuitionFeesUpToDate"
                          color="primary"
                        />
                      }
                      label="Tuition fees up to date"
                    />
                  </Grid>}

                  { (modelValue >1) &&<Grid
                    xs={12}
                    md={3}
                  >
                    <TextField
                      label="Gender"
                      fullWidth
                      name="gender"
                      required
                      select
                      value={values.gender}
                      SelectProps={{ native: true }}
                      onChange={handleChange}
                    >
                      {genderList.map((option) => (
                        <option
                          key={option.code}
                          value={option.code}
                        >
                          {option.title}
                        </option>
                      ))}
                    </TextField>
                  </Grid>}

                  { (modelValue ==4 || modelValue >5) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.scholarshipHolder}
                          onChange={handleChange}
                          name="scholarshipHolder"
                          color="primary"
                        />
                      }
                      label="Scholarship holder"
                    />
                  </Grid>}

                  { (modelValue >0) &&<Grid xs={12} md={3}>
                    {/* TextField for applicationOrder */}
                    <TextField
                      label="Age at enrollment"
                      fullWidth
                      name="ageAtEnrollment"
                      type="number" // Set the type to number to allow only numeric input
                      inputProps={{ min: 15, max: 100 }} // Set the minimum and maximum values
                      value={values.ageAtEnrollment}
                      onChange={handleChange}
                    />
                  </Grid>}


                  { (modelValue >6) &&<Grid xs={12} md={3}>
                    {/* Checkbox for displaced */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.international}
                          onChange={handleChange}
                          name="international"
                          color="primary"
                        />
                      }
                      label="International"
                    />
                  </Grid>}

                  { (modelValue >6) &&<Grid xs={12} md={3}>
                    {/* TextField for unemploymentRate */}
                    <TextField
                      label="Unemployment Rate"
                      fullWidth
                      name="unemploymentRate"
                      type="number"
                      inputProps={{ min: 0, max: 100 }}
                      value={values.unemploymentRate}
                      onChange={handleChange}
                    />
                  </Grid>}

                  { (modelValue >6) &&<Grid xs={12} md={3}>
                    {/* TextField for inflationRate */}
                    <TextField
                      label="Inflation Rate"
                      fullWidth
                      name="inflationRate"
                      type="number"
                      inputProps={{ min: 0, max: 100 }}
                      value={values.inflationRate}
                      onChange={handleChange}
                    />
                  </Grid>}

                  { (modelValue==4 || modelValue >5) &&<Grid xs={12} md={3}>
                    {/* TextField for gdp */}
                    <TextField
                      label="GDP"
                      fullWidth
                      name="gdp"
                      type="number"
                      inputProps={{ min: 0, max: 9999999999 }}
                      value={values.gdp}
                      onChange={handleChange}
                    />
                  </Grid>}


                  {(modelValue > 4) &&<Box sx={{ width: '100%', mt: 3 }}>
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6">Curricular Units (1nd Semester)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CurricularUnits1stSemester values={values} handleChange={handleChange} />
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Box>}
                  {/* Section for curricularUnits2ndSem */}
                  {(modelValue >4) &&
                  <Box sx={{ width: '100%', mt: 3 }}>
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6">Curricular Units (2nd Semester)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CurricularUnits2ndSemester values={values} handleChange={handleChange} />
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Box>
                  }
                </Grid>
              </Box>
            </Card>

          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <SurveyForm formData={valuesSurvey} handleInputChange={handleSurveyChange} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Results response={serverResponse} />
          </TabPanel>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Predict
          </Button>
        </CardActions>
      </form>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

