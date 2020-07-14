window.addEventListener('load', function () {

    // var q = new XMLHttpRequest();
    //
    //     // ouverture du fichier
    //     q.open('get', 'Modele_Recapitulatif.htm', true);
    //
    //     // on attend que le fichier soit chargé
    //     q.onload = function () {
    //         // on passe le contenu du fichier dans la brique
    //         document.querySelector('.brique').innerHTML = q.responseText;
    //
    //         // on lance l'impression
    //         setTimeout(function () {
    //             generatePDF('mypdf');
    //         }, 2000);
    //     };
    //     q.send(null);

    /**
    * To generate PDF
    */
    var doc = new jsPDF();

    // We'll make our own renderer to skip this editor
    var specialElementHandlers = {
        '#editor': function(element, renderer){
            return true;
        }
    };

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    doc.fromHTML(document.querySelector('body'), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });

    doc.save('document.pdf');

});
