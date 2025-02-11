import pickle
from sklearn.preprocessing import StandardScaler
import sys
import json  # Import the JSON module

self_study_hr = 0
extracurricular = False

scale = StandardScaler() 

self_study_hr = sys.argv[1]  # Input: self study hours
extracurricular = sys.argv[2]  # Input: extracurricular activities

if extracurricular.lower() == "yes":
    extracurricular = True
else:
    extracurricular = False

math_score = int(sys.argv[3])  # Input: Math marks
Language_score = int(sys.argv[4])  # Input: Language score
Scince_score = int(sys.argv[5])  # Input: Science score
english_score = int(sys.argv[6])  # Input: English score
SocialScience_score = int(sys.argv[7])  # Input: Social Science score

# Calculate total and average scores
total_score = (
    math_score + Language_score + Scince_score + english_score + SocialScience_score
)

averagescore = total_score / 5
data = [
    [
        0,
        self_study_hr,
        extracurricular,
        math_score,
        Language_score,
        Scince_score,
        english_score,
        SocialScience_score,
        total_score,
        averagescore,
    ]
]
test = data

# Load the model and make predictions
with open("D:/CareerMate/Careermate/backend/mlModel/model.pkl", "rb") as f:
    model = pickle.load(f)

pro = model.predict_proba(test)
careers = {0: "Arts", 1: "Commerce", 2: "PCB", 3: "PCM", 4: "Others"}

# Create a dictionary to hold career predictions
predictions = {careers[i]: pro[0][i] for i in range(5)}

# Print the predictions in JSON format
print(json.dumps(predictions))
