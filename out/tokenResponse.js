"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenDescription = void 0;
const tokenType_1 = require("./tokenType");
function getTokenDescription(tokenType) {
    switch (tokenType) {
        case tokenType_1.TokenType.PACKAGEDECLARATION:
            return "Package Declaration: Declares the package that the current file belongs to.";
        case tokenType_1.TokenType.IMPORT:
            return "Import: Declares a package or a specific class or interface from a package.";
        case tokenType_1.TokenType.CLASSDECLARATION:
            return "Class Declaration: Declares a new class.";
        case tokenType_1.TokenType.FIELDDECLARATION:
            return "Field Declaration: Declares a new field within a class.";
        case tokenType_1.TokenType.METHODINVOCATION:
            return "Method Invocation: Calls a method on an object.";
        case tokenType_1.TokenType.METHODDECLARATION:
            return "Method Declaration: Declares a new method within a class.";
        case tokenType_1.TokenType.FORMALPARAMETER:
            return "Formal Parameter: Declares a parameter in a method declaration.";
        case tokenType_1.TokenType.LOCALVARIABLEDECLARATION:
            return "Local Variable Declaration: Declares a new local variable within a method or a block.";
        case tokenType_1.TokenType.RETURNSTATEMENT:
            return "Return Statement: Returns a value from a method.";
        case tokenType_1.TokenType.FORSTATEMENT:
            return "For Statement: Executes a block of code for a fixed number of times.";
        case tokenType_1.TokenType.BLOCKSTATEMENT:
            return "Block Statement: A sequence of statements enclosed in curly braces.";
        case tokenType_1.TokenType.ARRAYSELECTOR:
            return "Array Selector: Selects an element from an array.";
        case tokenType_1.TokenType.IFSTATEMENT:
            return "If Statement: Executes a block of code if a condition is true.";
        case tokenType_1.TokenType.STATEMENTEXPRESSION:
            return "Statement Expression: An expression that can be used as a statement.";
        case tokenType_1.TokenType.BREAKSTATEMENT:
            return "Break Statement: Terminates a loop or a switch statement.";
        case tokenType_1.TokenType.CONSTRUCTORDECLARATION:
            return "Constructor Declaration: Declares a new constructor for a class.";
        case tokenType_1.TokenType.WHILESTATEMENT:
            return "While Statement: Executes a block of code while a condition is true.";
        case tokenType_1.TokenType.ANNOTATION:
            return "Annotation: Provides additional information about a class or a method.";
        case tokenType_1.TokenType.TRYSTATEMENT:
            return "Try Statement: Executes a block of code and handles any exceptions that are thrown.";
        case tokenType_1.TokenType.SWITCHSTATEMENT:
            return "Switch Statement: Executes a block of code depending on the value of an expression.";
        case tokenType_1.TokenType.THROWSTATEMENT:
            return "Throw Statement: Throws an exception.";
        case tokenType_1.TokenType.INNERCLASSCREATOR:
            return "Inner Class Creator: Creates a new instance of an inner class.";
        case tokenType_1.TokenType.ENUMDECLARATION:
            return "Enum Declaration: Declares a new enumeration.";
        case tokenType_1.TokenType.CONTINUESTATEMENT:
            return "Continue Statement: Skips to the next iteration of a loop.";
        case tokenType_1.TokenType.STATEMENT:
            return "Statement: A line of code that performs an action.";
        case tokenType_1.TokenType.SYNCHRONIZEDSTATEMENT:
            return "Synchronized Statement: Coordinates access to a shared resource.";
        case tokenType_1.TokenType.ELEMENTVALUEPAIR:
            return "Element Value Pair: A key-value pair used in annotations.";
        case tokenType_1.TokenType.ASSERTSTATEMENT:
            return "Assert Statement: Checks that a condition is true and throws an error if it's not.";
        case tokenType_1.TokenType.INTERFACEDECLARATION:
            return "Interface Declaration: Declares a new interface.";
        case tokenType_1.TokenType.DOSTATEMENT:
            return "Do Statement: Executes a block of code while a condition is true, and checks if the condition is false at the end.";
        case tokenType_1.TokenType.ANNOTATIONDECLARATION:
            return "Annotation Declaration: Declares a new annotation type.";
        case tokenType_1.TokenType.THIS:
            return "This: Refers to the current object.";
        case tokenType_1.TokenType.CONSTANTDECLARATION:
            return "Constant Declaration: Declares a new constant.";
        case tokenType_1.TokenType.SUPERMETHODINVOCATION:
            return "Super Method Invocation: Calls a method on the superclass of the current class.";
        case tokenType_1.TokenType.ANNOTATIONMETHOD:
            return "Annotation Method: A method within an annotation type.";
        case tokenType_1.TokenType.SUPERCONSTRUCTORINVOCATION:
            return "Super Constructor Invocation: Calls a constructor in the superclass of the current class.";
        case tokenType_1.TokenType.SUPERMEMBERREFERENCE:
            return "Super Member Reference: Refers to a member in the superclass of the current class.";
        default:
            return "Unknown Token Type.";
    }
}
exports.getTokenDescription = getTokenDescription;
//# sourceMappingURL=tokenResponse.js.map