# Fixit

**Fixit** is a MERN-stack application designed to streamline the process of raising, tracking, and managing complaints within an organization or community. Built in under 10 hours. A hackathon challenge hosted by CodingOTT yt channel.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Admin Capabilities](#admin-capabilities)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Features

- **Add Complaint:** Submit new issues or complaints to the system.
- **Track Status:** Monitor the progress and status updates of submitted complaints.
- **Upvote:** Upvote complaints to highlight urgent or recurring issues.
- **Filter by Hot Issues:** Filter complaints based on popularity or urgency (e.g., most upvoted).

### Admin Features

- **Update Status:** Change the status of any complaint (e.g., Open, In Progress, Resolved).
- **Delete Complaint:** Remove any complaint from the system.

---

## Tech Stack

- **MongoDB:** Database for storing complaints, users, and status updates.
- **Express.js:** Backend framework for handling API requests and routing.
- **React.js:** Frontend framework for building an interactive user interface.
- **Node.js:** Server runtime environment.
- **UI:** Daisy UI and Tailwind.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/ajey108/fixit.git
    cd fixit
    ```

2. **Install dependencies for both backend and frontend**
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**
    - Create a `.env` file in backend and frontend folders as per the provided `.env.example`.

4. **Run the application**

    - **Backend**
      ```bash
      cd backend
      npm run dev
      ```

    - **Frontend**
      ```bash
      cd frontend
      npm run dev
      ```



## Usage

- **Submit a Complaint:** Use the "Add Complaint" form to submit an issue.
- **Track Complaint:** Check the status of your complaints in the "Status" section.
- **Upvote:** Upvote issues that matter most to you.
- **Filter Hot Issues:** Use filters to see the most upvoted or trending complaints.

---

## Admin Capabilities

- **Update Status:** Log in as an admin and change the status of any complaint. 
- **Delete Complaint:** Remove complaints that are inappropriate or resolved outside the platform.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---

## License

This project is licensed under the MIT License.

---

*For any queries or support, please contact [ajayxa1@gmail.com].*
