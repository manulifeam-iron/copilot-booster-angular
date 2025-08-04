# MU Copilot Booster Angular

## Overview

This is a sample Angular application for managing doctors and patients. It demonstrates modern Angular features, component-based architecture, and integration with an external API service. The app includes pages for listing doctors and patients, as well as viewing detailed information for each.

## Purpose

The purpose of this app is to be used as a training project for Copilot features. It provides practical scenarios for users to explore and learn how Copilot can assist in Angular development.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher recommended)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/manulife-university-global/mu-copilot-booster-angular.git
   cd mu-copilot-booster-angular
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   API_URL=http://localhost:8080/
   ```
  This URL will serve as our backend service

### Running the Application

Start the development server:
```sh
npm run start
```
The app will be available at [http://localhost:4200](http://localhost:4200) by default.

## Environment Variables

- `API_URL`: The base URL of your backend API.

