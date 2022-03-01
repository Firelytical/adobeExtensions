
main();






function main() {
   var theFileName="";
    
    var w = new Window('dialog', 'Insert To Timeline');
    w.group = w.add('group');
    w.group.add('statictext {text: "ClipName"}');
    w.input = w.group.add('edittext {characters: 40, active: true}');
    w.buttons = w.add('group {alignment: "right"}');
    w.ok = w.buttons.add('button {text: "OK", enabled: false}');
    w.buttons.add('button {text: "Cancel"}');
    
    w.input.onChanging = function() {
        w.ok.enabled = !app.activeDocument.hyperlinkTextDestinations.item(w.input.text).isValid;
        theFileName=w.input.text;
    }
    w.show();
    alert(theFileName.toString());


}
