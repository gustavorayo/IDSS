from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from ensambleAllModels import is_Graduate_model_full, is_Graduate_model_1, is_Graduate_model_2, is_Graduate_model_2, \
    is_Graduate_model_3, is_Graduate_model_4, is_Graduate_model_5, is_Graduate_model_6
from statistics import mean

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Function to recursively convert string values to numbers
def convert_to_numbers(d):
    for key, value in d.items():
        if isinstance(value, dict):
            d[key] = convert_to_numbers(value)
        elif isinstance(value, str) and value.replace(".", "", 1).isdigit():
            if "." in value:
                d[key] = float(value)
            else:
                d[key] = int(value)
    return d


def extract_features(json_data, set_number):
    basic_basic_features = ["ageAtEnrollment", "previousQualificationGrade", "admissionGrade"]
    basic_features = ["nationality", "gender"]
    academic_features = ["applicationMode", "educationalSpecialNeeds", "daytimeEveningAttendance", "course"]
    financial_features = ["debtor", "tuitionFeesUpToDate", "scholarshipHolder", "gdp"]
    full_academic_features = [
        "curricularUnits1stSem",
        "curricularUnits2ndSem"
    ]

    selected_features = []

    if set_number == 1:
        selected_features = basic_basic_features
    elif set_number == 2:
        selected_features = basic_basic_features + basic_features
    elif set_number == 3:
        selected_features = basic_basic_features + basic_features + academic_features
    elif set_number == 4:
        selected_features = basic_basic_features + basic_features + financial_features
    elif set_number == 5:
        selected_features = basic_basic_features + basic_features + academic_features + full_academic_features
    elif set_number == 6:
        selected_features = basic_basic_features + basic_features + academic_features + financial_features + full_academic_features
    elif set_number == 7:
        selected_features = list(json_data.keys())

    result = {feature: json_data[feature] for feature in selected_features if feature in json_data}
    return result


# Function to flatten a nested dictionary
def flatten_dictionary(d, parent_key='', sep='_'):
    flat_dict = {}
    for k, v in d.items():
        new_key = f'{parent_key}{sep}{k}' if parent_key else k
        if isinstance(v, dict):
            flat_dict.update(flatten_dictionary(v, new_key, sep=sep))
        else:
            flat_dict[new_key] = v
    return flat_dict


def evaluate_survey(survey):
    mean_value = mean(survey.values())
    print(survey)
    return mean_value


def predict(values, model):
    print(f"values", values, "model", model)
    if model == 7:
        result = is_Graduate_model_full(values)
    elif model == 1:
        result = is_Graduate_model_1(values)
    elif model == 2:
        result = is_Graduate_model_2(values)
    elif model == 3:
        result = is_Graduate_model_3(values)
    elif model == 4:
        result = is_Graduate_model_4(values)
    elif model == 5:
        result = is_Graduate_model_5(values)
    elif model == 6:
        result = is_Graduate_model_6(values)
    else:
        raise Exception(f"model {model} not supported")

    return result


def get_weighted_mean(model_prediction, user_assignment, model):
    model_weights = {1: 6.5, 2: 7, 3: 7, 4: 7.5, 5: 9, 6: 9.2, 7: 9.2}
    print(model_prediction, user_assignment)

    weight_model = model_weights[model]  # Adjust the weight for the model prediction

    model_res = (model_prediction * weight_model)

    model_influence = weight_model / (10 + weight_model)
    professor_influence = 10 / (10 + weight_model)

    applied_wights = {'model': round(model_influence * 100, 2), 'professor': round(professor_influence * 100, 2)}

    combined_value = ((model_res + user_assignment) / (10 + weight_model)) * 10
    print("combined_value", combined_value)
    return round(combined_value, 2), applied_wights


@app.post("/predict")
def create_predict(data: dict = Body(...)):
    # Access the JSON data in the 'data' parameter
    try:
        features = extract_features(data['form'], int(data['model']))
        converted_data = convert_to_numbers(features)
        flattened_data = flatten_dictionary(converted_data)
        values_list = list(flattened_data.values())
        print(values_list)
        model = int(data['model'])
        result = predict(list([values_list]), model)
        model_pred = result
        survey = evaluate_survey(data['surveyForm']['survey'])
        weighted_mean, applied_wights = get_weighted_mean(model_pred, survey, model)
        return {'model': model, 'model_result': model_pred,
                'survey': survey, 'weighted_mean': weighted_mean, 'applied_wights': applied_wights}
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing required field: {e}")
