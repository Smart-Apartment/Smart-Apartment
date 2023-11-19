import cv2
import qrcode
import numpy as np

def imageFeature(image):
    image_path = "./img.jpg"
    image = cv2.imread(image_path)
    image1=cv2.imread("./img1.jpg")
    image2=cv2.imread("./img2.jpg")

    hist = cv2.calcHist([image], [0,1,2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])


    encoded_features = ",".join(map(str, hist.flatten()))


    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    a=encoded_features

    qr.add_data(encoded_features)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save("feature_qr_code.png")

    return a