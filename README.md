# Vendor Management System

This is a Node.js-based Vendor Management System built using the Next.js framework. The system allows for the management of vendor profiles, tracking of purchase orders, and calculation of vendor performance metrics.


## Features

- Vendor Profile Management: Create, read, update, and delete vendor profiles

- Purchase Order Tracking: Create, read, update, and delete purchase orders

- Performance Metrics: Calculate and retrieve vendor performance metrics, including on-time delivery rate, quality rating average, average response time, and fulfillment rate


## Technologies Used

- Typescript
- Next.js
- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yashkhandelwal123/Vendor-Management-System.git

### Docker Installation

1. Install Docker :- Ensure Docker is installed on the target PC. You can download and install Docker from the official Docker website:

-   Docker Desktop for Windows
-   Docker Desktop for Mac
-   Docker Engine for Linux

2. Pull the Docker Image :- On the target PC, you need to pull the Docker image from Docker Hub (or the registry where you pushed it). Use the following command:

 bash
   sh docker pull khandelwalyash6185/vendor-management-system:latest

3. Run the Docker Container :- Once the image is pulled, you can run it with Docker. You'll need to specify the necessary ports and environment variables if required. Here’s an example command:

```bash
   sh docker run -d -p 3000:3000 --name vendor-management-system khandelwalyash6185/vendor-management


# API Endpoints

## Vendor Profile

- POST /vendors: Create a new vendor
    ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/zkjulxohigezpaow11gq.jpg)


- GET /vendors: List all vendors
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/jerglmkkdztkuqsmubok.jpg)

- GET /vendors/:vendorId: Retrieve a specific vendor's details
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/k1sw9n3lvz5wx2aswjmr.jpg)

- PUT /vendors/:vendorId: Update a vendor's details


- DELETE /vendors/:vendorId: Delete a vendor


## Purchase Order


- POST /purchase-orders: Create a new purchase order
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/hbp7xvy2lulumfvwoade.jpg)


- GET /purchase-orders: List all purchase orders
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/gscvtckksldw8y87xgt6.jpg)

- GET /purchase-orders/:poId: Retrieve details of a specific purchase order


- PUT /purchase-orders/:poId: Update a purchase order


- DELETE /purchase-orders/:poId: Delete a purchase order


## Metrics
- GET /vendors/:vendorId/performance: Retrieve a vendor's performance metrics


# Setup Instructions

- Clone the repository using git clone.

- Install dependencies using npm install or yarn install.

- Start the application using npm run start or yarn start.

- Use a tool Postman to test the API endpoints.