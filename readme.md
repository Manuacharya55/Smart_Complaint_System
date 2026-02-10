# 🏙️ Smart Complaint System

A MERN stack application designed to streamline the process of reporting, managing, and resolving civic complaints. It features an intuitive user interface for citizens to lodge complaints and a robust admin panel for authorities to manage them efficiently.

> **[LIVE DEMO LINK HERE]**

## ✨ Features

### 👤 User Panel
-   **Authentication**: Secure Register/Login system.
-   **Lodge Complaint**: Upload complaints with images, location (auto-fetched), and description.
-   **Track Status**: View status of reported complaints (Pending, Processing, Resolved).
-   **Location Integration**: Auto-detect location using Geolocation API and reverse geocoding via LocationIQ.

### 🛡️ Admin/Authority Panel
-   **Dashboard**: Overview of total, pending, and resolved complaints.
-   **Manage Complaints**: View detailed complaints, view location on map, and update status.
-   **Department Management**: Add, edit, or delete departments.
-   **User Management**: Manage user roles and details.
-   **Place Management**: Manage places/locations.
-   **Visual Analysis**: AI-powered analysis of complaint images using Google Gemini (backend).

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **Tailwind CSS** & Custom CSS
-   **Appwrite** (Image Storage)
-   **React Leaflet** (Maps)
-   **React Hot Toast** (Notifications)
-   **Axios** (API Requests)

### Backend
-   **Node.js & Express**
-   **MongoDB** (Database)
-   **Mongoose** (ODM)
-   **JWT** (Authentication)
-   **Nodemailer** (Email Notifications)
-   **Google Gemini AI** (Image Analysis)
-   **Appwrite** (Server-side integration)

## 🚀 Getting Started

### Prerequisites
-   Node.js installed
-   MongoDB installed or MongoDB Atlas URI
-   Appwrite project setup
-   Google Gemini API Key
-   LocationIQ API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd smart-complaint-system
    ```

2.  **Server Setup**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    
    # Email Config
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_email_password
    
    # AI & Storage
    GEMINI_API_KEY=your_gemini_api_key
    APPWRITE_PROJECT_ID=your_appwrite_project_id
    APPWRITE_KEY=your_appwrite_api_key
    ```
    Start the server:
    ```bash
    npm run dev
    ```

3.  **Client Setup**
    ```bash
    cd ../client
    npm install
    ```
    Create a `.env` file in the `client` directory:
    ```env
    VITE_PROJECT_END_POINT=https://cloud.appwrite.io/v1
    VITE_PROJECT_ID=your_appwrite_project_id
    VITE_BUCKET_ID=your_appwrite_bucket_id
    VITE_KEY=your_locationiq_api_key
    ```
    Start the client:
    ```bash
    npm run dev
    ```

## 📸 Screenshots

*(Add screenshots of Dashboard, Login, Complaint Form here)*

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
