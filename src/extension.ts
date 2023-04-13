// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from "console";
import * as vscode from "vscode";


export let commentLine = -1;
export let flag = false;

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
    const currentLine = textEditor.document.lineAt(textEditor.selection.active.line).text;
    console.log(currentLine);
  });

  context.subscriptions.push(disposable1);

  let disposable2 = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
    const latestChange = event.contentChanges[event.contentChanges.length - 1];
    const text = latestChange.text;
    vscode.window.showInformationMessage(latestChange.text);
    const isReturnKeyPressed = text.charAt(text.length-1) === '\n'&&!text.includes("/** Hint: ");
    

    if (isReturnKeyPressed) {
        flag = true;
        console.log("enter return statement");
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          console.log("editor not found");
          return;
        }
        console.log("CommentLine:"+ commentLine);
        
        if(commentLine !== -1&&flag){
            console.log("enter deleting statement");
            let endingLine = commentLine;
            let lineText = editor.document.lineAt(endingLine).text;
            while(endingLine<editor.document.lineCount&&!lineText.includes("**/")){
                lineText = editor.document.lineAt(endingLine).text;
                endingLine++;
            }
            console.log("ending: "+endingLine);
            const endingLineLength = editor.document.lineAt(endingLine).text.length;
            const endingPosition = new vscode.Position(endingLine, endingLineLength);
            const commentRange = new vscode.Range(new vscode.Position(commentLine,0),endingPosition);
            editor.edit((editBuilder) => {
                console.log("deleting");
                editBuilder.delete(commentRange);
            }).then(() => {
                // Refresh and save the document after the change
                const document = editor.document;
                document.save();
                vscode.window.showInformationMessage('Text deleted and document saved!');
            });
            commentLine = -1;
        }
        
        const selection = editor.selection;
        const startPosition = new vscode.Position(0, 0);
        const endPosition = selection.end;
        const content = editor.document.getText(new vscode.Range(startPosition, endPosition));
        commentLine = endPosition.line+1;
        console.log("currentLine: "+   commentLine);
        const commentString = "/** Hint: "+content+" **/ \n";
        console.log(commentString);
        editor.edit((editBuilder: vscode.TextEditorEdit) => {
            console.log("enter inserting statement");
            flag = false;
            editBuilder.insert(endPosition.with(commentLine+1), commentString);
        }).then(() => {
            // Refresh and save the document after the change
            const document = editor.document;
            document.save();
            console.log("finish inserting statement");
            vscode.window.showInformationMessage('Text inserted and document saved!');
        });
        // editor1.edit((editBuilder) => {
        //     editBuilder.insert(endPosition.with(commentLine), commentString);
        // });
    }
  });


//   if (editor) {
//     const position = editor.selection.active;
//     const commentString = "// This is a comment";
//     editor.edit((editBuilder) => {
//       editBuilder.insert(position, commentString);
//     });
//   }


  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}



// if (editor) {
//   const position = editor.selection.active;
//   const document = editor.document;
//   const line = document.lineAt(position.line);
//   const commentStart = line.text.indexOf("//");
//   if (commentStart >= 0 && commentStart < position.character) {
//     const commentRange = new vscode.Range(
//       position.line,
//       commentStart,
//       position.line,
//       line.range.end.character
//     );
//     editor.edit((editBuilder) => {
//       editBuilder.delete(commentRange);
//     });
//   }
// }
