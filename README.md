# Technical Report on the Development of a Code Hinter VS Code Extension

## 1. Introduction

The Code Hinter extension assists programmers in maintaining consistent code style and providing hints during the programming process. As a Visual Studio Code (VS Code) extension, it reaches a broad audience and integrates seamlessly with the popular IDE. VS Code's rich ecosystem, robust API, and built-in marketplace allow the Code Hinter extension to deliver a streamlined, native, and intuitive user experience, improving code quality and maintainability.

## 2. Implementation

The VS Code extension is implemented using TypeScript, the Language API provided by VS Code, and a Flask server that serves as an API to call the trained model. The process consists of the following steps:

### 2.1. Check user input character

The extension monitors the user's input and checks if the typed character is ';' or '}'. If either of these characters is detected, the extension prepares to insert a comment.

### 2.2. Call Flask API

The extension makes a POST request to the Flask server, sending the current document and the last input line number.

### 2.3. Await server response

The extension waits for the server's response, which includes information on whether there was an error or a specific token type (implemented as an enumeration).

### 2.4. Insert comment

Based on the server's response, the extension inserts a comment by mapping the received token to a hardcoded comment.

### 2.5. Alternative flow

If the user's typed character is neither ';' nor '}', the extension tries to find the last generated comment and deletes it.

## 3. Examples and Resources

The extension is also available on the VS Code Extension Marketplace: https://marketplace.visualstudio.com/items?itemName=hongshuw.code-hinter
