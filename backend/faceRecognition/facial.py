import cv2
import numpy as np
import base64
from PIL import Image
from io import BytesIO
import datetime
import os 

def imageFeature(image):
    try:
        if isinstance(image, bytes):
            image = cv2.imdecode(np.frombuffer(image, dtype=np.uint8), -1)
        elif isinstance(image, str):
            # If image is a file path, read the image
            image = cv2.imread(image, cv2.IMREAD_UNCHANGED)
        else:
            raise ValueError("Unsupported input type for image. Expecting bytes or str.")

        # Check if the image is loaded successfully
        if image is None:
            raise ValueError("Image not loaded successfully.")

        # Ensure the image has the correct number of channels
        if len(image.shape) not in (2, 3):
            raise ValueError("Invalid number of channels in the image.")

        # Determine the number of channels dynamically
        hist = cv2.calcHist([image], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])

        encoded_features = ",".join(map(str, hist.flatten()))

        return encoded_features

    except Exception as e:
        print(f"Error in imageFeature: {str(e)}")
        return None

#Example of how to call the function with image bytes
def new_image(file_name):
    with open(file_name, "rb") as image_file:
        image_bytes = image_file.read()
    
    return imageFeature(image_bytes)



def genarate_feature(value):
    value=value.decode("utf-8")
    # Extract the base64-encoded image data
    data_index = value.find(',') + 1
    image_data = value[data_index:]

    # Decode the base64-encoded image data to bytes
    image_bytes = base64.b64decode(image_data)

    # Open the image using PIL
    image = Image.open(BytesIO(image_bytes))
    x = datetime.datetime.now()
    x = x.strftime("%f")
    filename = x + ".jpg"
    image.save(filename, "JPEG")

    res = new_image(filename)
    try:
        os.remove(filename)
        print(f"{filename} has been deleted.")
    except FileNotFoundError:
        print(f"{filename} not found. Unable to delete.")
    except Exception as e:
        print(f"Error deleting {filename}: {e}")

    return res



