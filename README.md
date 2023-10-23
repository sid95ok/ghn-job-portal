# Title Get Hired Now - ghn-job-portal

## Description
This web app is a job portal designed to connect job seekers with diverse career opportunities, making the job search process easy and efficient.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Credits](#credits)
- [Contact](#contact)

## Installation
To set up this project, follow these steps (tested on Mac/Linux):

1. Clone the GHN repo to your local machine:
   ```
   git clone https://github.com/sid95ok/ghn-job-portal.git
   ```

2. Navigate to the project directory:
   ```
   cd ghn-job-portal
   ```

3. Run the following Bash command, providing your database URI and JWT secret as arguments (ensure to have both secrets securely with you):
   ```
   bash local-build.sh <DB_URI> <JWT_SECRET>
   ```

4. If everything goes well, the app should be deployed locally, and you can access it at:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend server: [http://localhost:8080](http://localhost:8080)

## Usage
After logging in or signing up, the app is easy to use with the following features:

- View all posted jobs on the 'Homepage.'
- Click on a job to see complete details.
- Apply for a job by clicking the 'Apply' button.
- See all previously applied jobs on the 'Applications' page.
- Update user details like name, email, etc from the 'Profile' page.
- Safely log out from the website when your work is completed.

## Contribution
Any pull requests (PRs) are welcomed. The developer is also working on Swagger documentation to make the project more accessible for future users. Till then here is a postman collection - https://api.postman.com/collections/4386344-b75c7517-b593-4ccf-bcc0-cf5589ce1bb9?access_key=PMAT-01HDEMP82TJJ4XJNEYQGJCYN2E

Need to add two env variables in postman - 'URLv1'(for local mode - [http://localhost:8080/api/v1](http://localhost:8080/api/v1)) and 'token'(generated using /login get API)

## Credits
This project was solely developed by Siddhant Pathak.

## Contact
To contact the developer of this repository, please send an email to [siddhant.pathak@icloud.com](mailto:siddhant.pathak@icloud.com). Please refrain from spamming.

```
