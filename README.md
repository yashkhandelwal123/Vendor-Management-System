# Vendor Management System

This is a Node.js-based Vendor Management System built using the NestJS framework. The system allows for the management of vendor profiles, tracking of purchase orders, and calculation of vendor performance metrics.


## Features

- Vendor Profile Management: Create, read, update, and delete vendor profiles

- Purchase Order Tracking: Create, read, update, and delete purchase orders

- Performance Metrics: Calculate and retrieve vendor performance metrics, including on-time delivery rate, quality rating average, average response time, and fulfillment rate


## Technologies Used

- Node.js
- Next.Js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone <repo link>


# API Endpoints

## Vendor Profile

- POST /vendors: Create a new vendor


- GET /vendors: List all vendors


- GET /vendors/:vendorId: Retrieve a specific vendor's details


- PUT /vendors/:vendorId: Update a vendor's details


- DELETE /vendors/:vendorId: Delete a vendor


## Purchase Order


- POST /purchase-orders: Create a new purchase order



- GET /purchase-orders: List all purchase orders


- GET /purchase-orders/:poId: Retrieve details of a specific purchase order


- PUT /purchase-orders/:poId: Update a purchase order


- DELETE /purchase-orders/:poId: Delete a purchase order


## Metrics
- GET /vendors/:vendorId/performance: Retrieve a vendor's performance metrics


# Setup Instructions

- Clone the repository using git clone [https://github.com/yashkhandelwal123/Vendor-Management-System.git]

- Install dependencies using npm install or yarn install

- Start the application using npm run start or yarn start

- Use a tool Postman to test the API endpoints