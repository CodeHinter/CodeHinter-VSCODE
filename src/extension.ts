// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from "console";
import * as vscode from "vscode";


export let commentLine = -1;
export let flag = false;

function findLastComment(editor:vscode.TextEditor) {
  let document = editor.document;
  let lastComment = null;
  let endingLine = document.lineAt(document.lineCount - 1);
  for (let i = document.lineCount - 1; i >= 0; i--) {
    let line = document.lineAt(i);
    if(line.text.endsWith("**/ ")){
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
  let disposable1 = vscode.commands.registerTextEditorCommand('code-hinter.logCurrentLine', (textEditor: vscode.TextEditor) => {
    const editor = vscode.window.activeTextEditor;
        if (!editor) {
          console.log("editor not found");
          return;
        }
    let lastComment1 = findLastComment(editor);
    //console.log("wejwoidjaosijdoiasjdoaisda!!!!!!");
     if (lastComment1) {
        editor.edit(editBuilder => {
          if(lastComment1){
          editBuilder.delete(lastComment1);
          }
      });
      }
  });

  context.subscriptions.push(disposable1);

  let disposable2 = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
    const latestChange = event.contentChanges[event.contentChanges.length - 1];
    const text = latestChange.text;
    const isReturnKeyPressed = text.charAt(text.length-1) === '\n'&&!text.includes("/** Hint: ");
    if(!text.includes("/** Hint: ")){
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.log("editor not found");
        return;
      }
    let lastComment1 = findLastComment(editor);
        if (lastComment1) {
              editor.edit(editBuilder => {
                if(lastComment1){
                editBuilder.delete(lastComment1);
                }
            });
        }
    }
    if (isReturnKeyPressed) {
        console.log("enter return statement");
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          console.log("editor not found");
          return;
        }
        console.log("CommentLine:"+ commentLine);
        const selection = editor.selection;
        const startPosition = new vscode.Position(0, 0);
        const endPosition = selection.active;
        const content = editor.document.getText(new vscode.Range(startPosition, endPosition));
        commentLine = endPosition.line+1;
        //console.log("currentLine: "+   commentLine);
        const commentString = "/** Hint: "+content+" **/ \n";
       //console.log(commentString);
        editor.edit((editBuilder: vscode.TextEditorEdit) => {
            console.log("enter inserting statement");
            editBuilder.insert(endPosition.with(commentLine), commentString);
        });
    }
  });




  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
