# Teen Radar

### Summary
Teen Radar is a location-based app that lets users scan their area to estimate the likelihood of encountering teenagers.  
It uses the user's location to find nearby schools and calculates teen density based on proximity.  
The app fetches and stores school data from **Skolverket** in a **MongoDB** database, which is then queried to calculate density levels.  
Users can adjust the scanning radius and view results in real time.  
Location data is **never stored**, ensuring strong privacy.

---

### Tech Stack

#### Frontend
- React + Vite

#### Backend
- Express.js  
- MongoDB

---

### API Endpoints

- `POST /scan`: Sends location data to the backend and receives information about nearby schools and teen density.  
- `GET /settings`: Fetches the current settings such as the scanning radius.  
- `PUT /settings`: Updates the scanning radius based on user input.

#### Error Handling
- `200 OK`: The request was successful  
- `404 Not Found`: Radius was not found 
- `400 Bad Request`: Invalid request format or missing data (radius or coordinates) 
- `500 Internal Server Error`: A problem occurred on the server

---

### How to Run

1. Clone the repo  
2. Install dependencies:  
   - In frontend folder: `npm install`  
   - In `/backend`:  
     ```
     cd backend  
     npm install
     ```
3. Set up the database:  
   - Create a `.env` file in `/backend` and paste your MongoDB connection string:
4. Start the backend:  
   - From `/backend` folder: `npm run dev`  
5. Start the frontend:  
   - From the root folder: `npm run dev`  
6. Open in your browser:  
   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - Backend API: [http://localhost:3001](http://localhost:3001)

---

### A11y and SEO

This project includes basic SEO using meta tags like `title`, `description`, and `meta name="title"`.  
These tags help search engines understand the app and display it better in search results.  
Accessibility improvements include semantic elements and `aria-labels` for better screen reader support.

---

### Tracking

The app uses Google Analytics via `gtag` to anonymously track button clicks on the “Scan area” feature.  
This helps measure engagement and identify usability improvements.  
**No personal data is collected.**

---

### Security

#### Common Vulnerabilities Addressed

**1. Injection**  
Users could try to send unexpected or malicious values to endpoints, like changing the scan radius to extremely large values or injecting invalid data.

**2. Cryptographic Failures**  
Since location data is considered personally sensitive, storing or logging it could risk user privacy if the system is ever compromised.

#### Mitigation

- To protect user privacy, user location are not saved in logs or databases.  
- All data is processed in-memory and discarded after use.  
- The radius setting is type-checked and defaults are enforced.

