# 🫀 BEat-well: Heart Disease Predictor
BEat-well is a web-based heart disease prediction tool that uses machine learning to predict the likelihood of heart disease based on clinical input data. It is powered by a trained Random Forest model and provides an easy-to-use frontend deployed on **AWS Amplify**.

---

## 🚀 Live Demo
🔗 https://main.d35vbh139ds45v.amplifyapp.com/

---

## 📊 Project Summary
| Metric                    | Value                                 |
|---------------------------|----------------------------------------|
| 📄 Dataset                | UCI Cleveland Heart Disease Dataset    |
| 🔢 Features               | 13 clinical parameters                 |
| 🧠 Algorithms Tested      | Logistic Regression, KNN, SVM, RF      |
| 🏆 Best Model             | Random Forest (~87% accuracy)          |
| ⚗️ Test/Train Split       | 80/20                                  |
| 📦 Model Format           | Pickle (`model.pkl`)                   |

---

## 🛠️ Tech Stack
| Component      | Technology             |
|----------------|------------------------|
| 💻 Frontend    | HTML, CSS, JavaScript  |
| 🐍 Backend     | Python (Flask)         |
| 📊 ML Model    | Scikit-learn           |
| 📦 Deployment  | Frontend only via AWS Amplify |
| 🧪 Testing     | Manual & browser-based |

---

## 🧠 ML Model Workflow
1. User inputs clinical data (e.g., age, cholesterol).
2. Data is passed to the Flask backend.
3. Backend loads the pre-trained `model.pkl`.
4. Prediction is returned and displayed on the UI.

