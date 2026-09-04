# 🎉 THE DIGITAL CELEBRATION (Teachers' Day)

An unforgettable, high-impact, cinematic digital celebration experience built entirely with HTML, CSS, and Vanilla JavaScript. Designed to surprise and delight teachers via a personalized QR code scan.

## ✨ Features
- **Dynamic Routing:** Pass a URL parameter (`?teacher=teacher1`) to instantly customize the UI.
- **Cinematic Flow:** Starts with a locked mystery screen, builds anticipation via a countdown, and erupts into a fireworks celebration.
- **Custom Fireworks/Confetti Engine:** High-performance, zero-dependency particle system built using purely JS/DOM elements with auto-cleanup to prevent memory leaks.
- **Interactive UI Components:** 3D Flip Cards, animated SVG-style CSS envelopes, and a card-shuffling deck.
- **Fallback Safe:** Handles missing images by dynamically generating a beautiful monogram avatar.

## 🚀 How to Run Locally
Because this project uses vanilla web technologies without any backend logic, you can run it instantly:
1. Extract the folder.
2. Open `index.html` in any modern web browser.
3. *Optional:* To test URL parameters locally, you may need to use a local live server (e.g., VSCode Live Server plugin) and append `?teacher=teacher1` to the URL.

## 🛠 How to Customize Data

Open `script.js` and locate the `teachers` object at the very top (Line 3). 

### How to Replace Teacher Names & Messages
Simply edit the string values inside the object:
```javascript
teacher1: {
    name: "Mr. John Doe",
    photo: "assets/john.jpg", // Make sure to add this image to the assets folder
    message: "Thank you for making math so much fun!"
}