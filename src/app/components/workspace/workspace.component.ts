import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  html_edit:string = `<h1>Hola mundo</h1>`;
  css_edit:string = `h1{color:red;}`;
  js_edit:string = `console.log('hola mundo')`;

  preview:string =`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${this.css_edit}
      </style>
    </head>
    <body>
      <script>
        ${this.js_edit}
      </script>
      ${this.html_edit}
    </body>
  </html>

  `


  ngOnInit(): void {
    this.inicializarPreview();
  }

  inicializarPreview(){
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
  }
  onChangeCode(){
    this.preview =`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${this.css_edit}
        </style>
      </head>
      <body>
        <script>
          ${this.js_edit}
        </script>
        ${this.html_edit}
      </body>
    </html>
  
    `
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
  }
  
}
