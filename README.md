# URL parameter appender Front-End
This is the front-end of the URL Management system, built with React and TypeScript. 
It allows users to input a URL and custom parameters, which are then sent to the back-end to generate a new URL with the parameters appended.
The application also displays a paginated list of all persisted URLs.

## Features

- Input form to append parameters to a URL.
- Display the new URL with parameters appended.
- Paginated list of all URLs stored in the database.
- Validation of URLs and parameters on the client side.
  
## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** (>=14.x) - Required to run the back-end and front-end of the application.
- **npm** - Required to manage project dependencies.
- **TypeScript** (>=4.x) - TypeScript is used for type safety in both front-end and back-end code.
- **MongoDB** (>=4.x) - A NoSQL database used to store the URLs.
- **Redis** (>=5.x) - An in-memory data structure store used for caching.

##**Installation steps for the libraries **
- npm install
- Backend is running on 3000 port. Hence Frontend will ask to change the port number from 3000 to the new one.
  
## **Installation Steps for MongoDB and Redis**
### **For macOS**

#### **1. Install Homebrew (if not already installed)**
Homebrew is a package manager for macOS that makes it easy to install software.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
#### **2. Install MongoDB**
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
```
#### **3. Start MongoDB**
```bash
brew services start mongodb/brew/mongodb-community
```
#### **4. Verify MongoDB Installation**
```bash
mongosh
```
This command opens the MongoDB shell, indicating that MongoDB is running correctly.

#### **. Install Redis**
```bash
brew install redis
```
#### **1. Start Redis**
```bash
brew services start redis
```
#### **2. Verify Redis Installation**
```bash
redis-cli
```
This command opens the Redis command-line interface, showing that Redis is running correctly.

### **For Windows**
#### **1. Install MongoDB**
1. **Download MongoDB Installer:**
   - Go to the [MongoDB Download Center](https://www.mongodb.com/try/download/community) and download the MongoDB Community Server for Windows.
2. **Run the Installer:**
   - Double-click the downloaded `.msi` file and follow the installation wizard.
   - Ensure "Install MongoDB as a Service" is checked.
3. **Verify MongoDB Installation:**
   - Open the command prompt and run:
     ```bash
     mongosh
     ```
#### **2. Install Redis**
Redis is not natively supported on Windows, but you can use third-party builds:
1. **Download Redis for Windows:**
   - You can use [Memurai](https://www.memurai.com/) or [Redis for Windows](https://github.com/MicrosoftArchive/redis/releases).
2. **Run the Installer:**
   - Run the downloaded installer and follow the instructions.
3. **Start Redis:**
   - Redis should start automatically after installation. If not, you can start it manually from the command prompt.
4. **Verify Redis Installation:**
   - Open the command prompt and run:

     ```bash
     redis-cli
     ```
These steps should help you set up MongoDB and Redis on your development environment across macOS and Windows.
