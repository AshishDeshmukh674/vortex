import cv2
import os
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_file = os.path.join(BASE_DIR, 'face_recognition_model.yml')

# Initialize the recognizer and read the model file
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read(model_file)

# Load the Haar Cascade for face detection
haarcascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(haarcascade_path)

# Label map for student names and their corresponding label IDs
label_map = {
        'ashish': 0,
        'manoj': 1,
        'nishchay' : 2,
        'athrva' : 3,
        'sahil' : 4
    # Add more students as needed
}

# Function to detect faces in an image
def detect_faces(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    return gray, faces

@app.route('/recognize', methods=['POST'])
def recognize():
    # Get the image path from the POST request
    data = request.get_json()
    imagePath = data.get('imagePath')
    
    # Construct absolute path for the image
    absolute_image_path = os.path.join(BASE_DIR, '..', imagePath)
    print(f"Loading image from: {absolute_image_path}")

    # Load the image and check if it exists
    image = cv2.imread(absolute_image_path)
    if image is None:
        print(f"Failed to load image from {absolute_image_path}")
        return jsonify({"message": f"Image does not exist at {absolute_image_path}"}), 400

    # Detect faces in the image
    gray, face_rects = detect_faces(image)
    recognized_faces = []

    print(f"Number of faces detected: {len(face_rects)}")

    for (x, y, w, h) in face_rects:
        face_roi = gray[y:y+h, x:x+w]
        label_id, confidence = recognizer.predict(face_roi)

        print(f"Detected label ID: {label_id}, Confidence: {confidence}")

        if confidence < 100:  # Adjust the confidence threshold as needed
            try:
                student_name = list(label_map.keys())[list(label_map.values()).index(label_id)]
                confidence_text = f"{student_name}: {round(100 - confidence)}%"
            except ValueError:
                student_name = "Unknown"
                confidence_text = f"Unknown (Label ID: {label_id})"
                print(f"Label ID {label_id} not found in label_map")
        else:
            student_name = "Unknown"
            confidence_text = "Unknown"

        print(f"Recognition result: {confidence_text}")

        # Collect recognition details
        recognized_faces.append({
            "name": student_name,
            "confidence_text": confidence_text,
            "position": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)},  # Ensure integers are used for JSON serialization
            "confidence": float(confidence)  # Convert NumPy float to Python float for JSON compatibility
        })

    # Return recognized faces or "No face detected" message
    if recognized_faces:
        return jsonify({"message": "Faces recognized", "faces": recognized_faces})
    else:
        print("No face detected")
        return jsonify({"message": "No face detected"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
