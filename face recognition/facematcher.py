import cv2
import numpy as np

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()

image1 = cv2.imread("./img1.jpg")
image2 = cv2.imread("./img2.jpg")

gray_image1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
gray_image2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

faces1 = face_cascade.detectMultiScale(gray_image1, scaleFactor=1.1, minNeighbors=5)
faces2 = face_cascade.detectMultiScale(gray_image2, scaleFactor=1.1, minNeighbors=5)

training_data = []
labels = []

for (x, y, w, h) in faces1:
    face_roi = gray_image1[y:y+h, x:x+w]
    training_data.append(face_roi)
    labels.append(1)

for (x, y, w, h) in faces2:
    face_roi = gray_image2[y:y+h, x:x+w]
    training_data.append(face_roi)
    labels.append(1)

recognizer.train(training_data, np.array(labels))

label1, confidence1 = recognizer.predict(gray_image1)
label2, confidence2 = recognizer.predict(gray_image2)

print(f"Confidence 1: {confidence1}")
print(f"Confidence 2: {confidence2}")

threshold = 70
result = abs(confidence1 - confidence2) < threshold

print(result)
