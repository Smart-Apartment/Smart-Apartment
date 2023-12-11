import pandas as pd
import joblib
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load spaCy English model

nlp = spacy.load("en_core_web_sm")

# Sample dataset with complaints and severity labels
# Assuming df is your dataset

df = pd.read_csv("./severity.csv",on_bad_lines='skip')
df.dropna(inplace=True)
# Text preprocessing using spaCy

def preprocess_text(text):
    doc = nlp(text)
    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return ' '.join(tokens)

df['clean_complaint'] = df['Complaint Text'].apply(preprocess_text)

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer()
X_tfidf = tfidf_vectorizer.fit_transform(df['clean_complaint'])

# Train a Multinomial Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_tfidf, df['Priority'])

# Save the trained model and vectorizer
joblib.dump(classifier, 'trained_model.pkl')
joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.pkl')
