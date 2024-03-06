import { Injectable } from '@angular/core';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";

import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }  

  generate(header:string, columnsHeaders: Array<string>, items:Array<any>, pdfName:string):void {
    const widths = Array(columnsHeaders.length).fill('*');    

    let document:  TDocumentDefinitions = {
      content: [               
        {text: header, fontSize: 14, bold: true, margin: [0, 20, 30, 8]},
        {
          style: 'Inventory_Table',
          table: {    
            headerRows: 1,
            widths: widths,        
            body: [
              columnsHeaders.map(h => [{text: h, style: 'tableHeader'}]),
              items.map((item: any) => columnsHeaders.map((header: string) => item[header]))
            ]
          },
          layout: 'lightHorizontalLines'
        }        
      ],  
      styles: {
        Inventory_Table: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }    
    };       
    
    pdfMake.createPdf(document).download(pdfName);
  }
}
