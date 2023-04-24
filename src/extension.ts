// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from "console";
import * as vscode from "vscode";
import { TokenType } from "./tokenType";
import { getTokenDescription } from "./tokenResponse";
import axios from 'axios';
const apiUrl = 'http://localhost:5000/model';

export let commentLine = -1;
export let flag = false;

function findLastComment(editor: vscode.TextEditor) {
  let document = editor.document;
  let lastComment = null;
  let endingLine = document.lineAt(document.lineCount - 1);
  for (let i = document.lineCount - 1; i >= 0; i--) {
    let line = document.lineAt(i);
    if (line.text.endsWith("**/ ")) {
      endingLine = line;
    }
    if (line.text.startsWith("/**")) {
      lastComment = new vscode.Range(line.range.start, endingLine.range.end);
      break;
    }
  }
  return lastComment ? lastComment : null;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "code-hinter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  // Register a callback function that will be called every time the active document changes
  let disposable1 = vscode.commands.registerTextEditorCommand(
    "code-hinter.logCurrentLine",
    (textEditor: vscode.TextEditor) => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log("editor not found");
        return;
      }
      let lastComment1 = findLastComment(editor);
      if (lastComment1) {
        editor.edit((editBuilder) => {
          if (lastComment1) {
            editBuilder.delete(lastComment1);
          }
        });
      }
    }
  );

  context.subscriptions.push(disposable1);
  
  // Register a callback function that will be called every time the active document changes
  let disposable2 = vscode.workspace.onDidChangeTextDocument(
    async (event: vscode.TextDocumentChangeEvent) => {
      const latestChange =
        event.contentChanges[event.contentChanges.length - 1];
      let text = '';
      if(latestChange)
      text = latestChange.text;
      const isReturnKeyPressed =
        text.charAt(text.length - 1) === "\n" && !text.includes("/** Hint: ");
      if (!text.includes("/** Hint: ")) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          console.log("editor not found");
          return;
        }
        let lastComment1 = findLastComment(editor);
        if (lastComment1) {
          editor.edit((editBuilder) => {
            if (lastComment1) {
              editBuilder.delete(lastComment1);
            }
          });
        }
      }
      if (isReturnKeyPressed) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          console.log("editor not found");
          return;
        }
        const selection = editor.selection;
        const startPosition = new vscode.Position(0, 0);
        const endPosition = selection.active;
        const content = editor.document.getText(
          new vscode.Range(startPosition, endPosition)
        );
        const wholeDocument = editor.document.getText();
        commentLine = endPosition.line + 1;
        const res = await callAPI(wholeDocument, commentLine);
        if (res !== "Unknown Token Type.") {
          const commentString = "/** Hint: " + res + " **/ \n";
          editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.insert(endPosition.with(commentLine), commentString);
          });
        }
      }
    }
  );
  context.subscriptions.push(disposable2);
}

async function callAPI(content: string, line: number): Promise<string> {
  console.log("Current Document: \n" + content + "------------------");
  console.log("User final typed line: " + line);
  const response = await axios.post(apiUrl, { content, line_number: line });
  // const tokenType = Math.floor(
  //   (Math.random() * Object.keys(TokenType).length) / 2
  // );
  let tokenType = response.data.result;
  console.log(tokenType);
  
  const tokenDescription = getTokenDescription(tokenType[0]);
  console.log(tokenDescription);
  
  return tokenDescription;
}

// This method is called when your extension is deactivated
export function deactivate() {}
