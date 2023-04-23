import { TokenType } from "./tokenType";

export function getTokenDescription(tokenType: TokenType): string {
  switch (tokenType) {
    case TokenType.PACKAGEDECLARATION:
      return "Package Declaration: Declares the package that the current file belongs to.";
    case TokenType.IMPORT:
      return "Import: Declares a package or a specific class or interface from a package.";
    case TokenType.CLASSDECLARATION:
      return "Class Declaration: Declares a new class.";
    case TokenType.FIELDDECLARATION:
      return "Field Declaration: Declares a new field within a class.";
    case TokenType.METHODINVOCATION:
      return "Method Invocation: Calls a method on an object.";
    case TokenType.METHODDECLARATION:
      return "Method Declaration: Declares a new method within a class.";
    case TokenType.FORMALPARAMETER:
      return "Formal Parameter: Declares a parameter in a method declaration.";
    case TokenType.LOCALVARIABLEDECLARATION:
      return "Local Variable Declaration: Declares a new local variable within a method or a block.";
    case TokenType.RETURNSTATEMENT:
      return "Return Statement: Returns a value from a method.";
    case TokenType.FORSTATEMENT:
      return "For Statement: Executes a block of code for a fixed number of times.";
    case TokenType.BLOCKSTATEMENT:
      return "Block Statement: A sequence of statements enclosed in curly braces.";
    case TokenType.ARRAYSELECTOR:
      return "Array Selector: Selects an element from an array.";
    case TokenType.IFSTATEMENT:
      return "If Statement: Executes a block of code if a condition is true.";
    case TokenType.STATEMENTEXPRESSION:
      return "Statement Expression: An expression that can be used as a statement.";
    case TokenType.BREAKSTATEMENT:
      return "Break Statement: Terminates a loop or a switch statement.";
    case TokenType.CONSTRUCTORDECLARATION:
      return "Constructor Declaration: Declares a new constructor for a class.";
    case TokenType.WHILESTATEMENT:
      return "While Statement: Executes a block of code while a condition is true.";
    case TokenType.ANNOTATION:
      return "Annotation: Provides additional information about a class or a method.";
    case TokenType.TRYSTATEMENT:
      return "Try Statement: Executes a block of code and handles any exceptions that are thrown.";
    case TokenType.SWITCHSTATEMENT:
      return "Switch Statement: Executes a block of code depending on the value of an expression.";
    case TokenType.THROWSTATEMENT:
      return "Throw Statement: Throws an exception.";
    case TokenType.INNERCLASSCREATOR:
      return "Inner Class Creator: Creates a new instance of an inner class.";
    case TokenType.ENUMDECLARATION:
      return "Enum Declaration: Declares a new enumeration.";
    case TokenType.CONTINUESTATEMENT:
      return "Continue Statement: Skips to the next iteration of a loop.";
    case TokenType.STATEMENT:
      return "Statement: A line of code that performs an action.";
    case TokenType.SYNCHRONIZEDSTATEMENT:
      return "Synchronized Statement: Coordinates access to a shared resource.";
    case TokenType.ELEMENTVALUEPAIR:
      return "Element Value Pair: A key-value pair used in annotations.";
    case TokenType.ASSERTSTATEMENT:
      return "Assert Statement: Checks that a condition is true and throws an error if it's not.";
    case TokenType.INTERFACEDECLARATION:
      return "Interface Declaration: Declares a new interface.";
    case TokenType.DOSTATEMENT:
      return "Do Statement: Executes a block of code while a condition is true, and checks if the condition is false at the end.";
    case TokenType.ANNOTATIONDECLARATION:
      return "Annotation Declaration: Declares a new annotation type.";
    case TokenType.THIS:
      return "This: Refers to the current object.";
    case TokenType.CONSTANTDECLARATION:
      return "Constant Declaration: Declares a new constant.";
    case TokenType.SUPERMETHODINVOCATION:
      return "Super Method Invocation: Calls a method on the superclass of the current class.";
    case TokenType.ANNOTATIONMETHOD:
      return "Annotation Method: A method within an annotation type.";
    case TokenType.SUPERCONSTRUCTORINVOCATION:
      return "Super Constructor Invocation: Calls a constructor in the superclass of the current class.";
    case TokenType.SUPERMEMBERREFERENCE:
      return "Super Member Reference: Refers to a member in the superclass of the current class.";
    default:
      return "Unknown Token Type.";
  }
}
