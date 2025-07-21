# text-storage

This project is a simple full-stack application for storing and retrieving text messages. It consists of a front-end interface and a back-end API, designed to work seamlessly with GitHub Pages and Vercel.

## Project Structure

- **client/**: Contains the front-end application files.
  - **index.html**: The entry point of the front-end application, featuring a text area and a save button.
  - **style.css**: Styles for the front-end application, defining the layout and appearance.
  - **script.js**: JavaScript file for handling interactions with the back-end API.

- **server/**: Contains the back-end API files.
  - **api/**: Directory for API-related files.
    - **message.js**: Handles GET and POST requests for storing and retrieving messages.
  - **vercel.json**: Configuration file for Vercel, defining API routes.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using `npm install`.
4. Start the development server for the back-end API.
5. Open the front-end application in your browser.

## Usage

- Use the text area to input messages.
- Click the save button to store the message.
- Messages can be retrieved from the back-end API.

## Deployment

- Deploy the front-end on GitHub Pages.
- Deploy the back-end on Vercel, ensuring that the API URL in `script.js` is updated to match your Vercel deployment.

## License

This project is licensed under the MIT License.