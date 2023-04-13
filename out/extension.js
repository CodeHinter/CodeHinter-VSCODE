"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.flag = exports.commentLine = void 0;
const vscode = require("vscode");
exports.commentLine = -1;
exports.flag = false;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "code-hinter" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // Register a callback function that will be called every time the active document changes
    let disposable1 = vscode.commands.registerTextEditorCommand('code-hinter.logCurrentLine', (textEditor) => {
        const currentLine = textEditor.document.lineAt(textEditor.selection.active.line).text;
        console.log(currentLine);
    });
    context.subscriptions.push(disposable1);
    let disposable2 = vscode.workspace.onDidChangeTextDocument((event) => {
        const latestChange = event.contentChanges[event.contentChanges.length - 1];
        const text = latestChange.text;
        vscode.window.showInformationMessage(latestChange.text);
        const isReturnKeyPressed = text.charAt(text.length - 1) === '\n' && !text.includes("/** Hint: ");
        if (isReturnKeyPressed) {
            exports.flag = true;
            console.log("enter return statement");
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                console.log("editor not found");
                return;
            }
            console.log("CommentLine:" + exports.commentLine);
            if (exports.commentLine !== -1 && exports.flag) {
                console.log("enter deleting statement");
                let endingLine = exports.commentLine;
                let lineText = editor.document.lineAt(endingLine).text;
                while (endingLine < editor.document.lineCount && !lineText.includes("**/")) {
                    lineText = editor.document.lineAt(endingLine).text;
                    endingLine++;
                }
                console.log("ending: " + endingLine);
                const endingLineLength = editor.document.lineAt(endingLine).text.length;
                const endingPosition = new vscode.Position(endingLine, endingLineLength);
                const commentRange = new vscode.Range(new vscode.Position(exports.commentLine, 0), endingPosition);
                editor.edit((editBuilder) => {
                    console.log("deleting");
                    editBuilder.delete(commentRange);
                }).then(() => {
                    // Refresh and save the document after the change
                    const document = editor.document;
                    document.save();
                    vscode.window.showInformationMessage('Text deleted and document saved!');
                });
                exports.commentLine = -1;
            }
            const selection = editor.selection;
            const startPosition = new vscode.Position(0, 0);
            const endPosition = selection.end;
            const content = editor.document.getText(new vscode.Range(startPosition, endPosition));
            exports.commentLine = endPosition.line + 1;
            console.log("currentLine: " + exports.commentLine);
            const commentString = "/** Hint: " + content + " **/ \n";
            console.log(commentString);
            editor.edit((editBuilder) => {
                console.log("enter inserting statement");
                exports.flag = false;
                editBuilder.insert(endPosition.with(exports.commentLine + 1), commentString);
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
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
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
//# sourceMappingURL=extension.js.map