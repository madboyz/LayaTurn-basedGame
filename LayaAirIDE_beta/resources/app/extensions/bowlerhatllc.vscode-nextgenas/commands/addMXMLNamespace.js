"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMXMLNamespace(textEditor, edit, prefix, uri, startIndex, endIndex) {
    if (!prefix || !uri) {
        return;
    }
    //exclude the whitespace before the namespace so that finding duplicates
    //doesn't depend on it
    let textToInsert = "xmlns:" + prefix + "=\"" + uri + "\"";
    let document = textEditor.document;
    let text = document.getText();
    let index = text.indexOf(textToInsert, startIndex);
    if (index !== -1 && index < endIndex) {
        return;
    }
    let position = document.positionAt(endIndex);
    //include the whitespace here instead (see above)
    edit.insert(position, " " + textToInsert);
}
exports.default = addMXMLNamespace;
//# sourceMappingURL=addMXMLNamespace.js.map