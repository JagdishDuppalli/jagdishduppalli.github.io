import { Component } from '@angular/core';
import { ScriptService } from '../script.service';

@Component({
  selector: 'website-layout',
  templateUrl: './website-layout.component.html'
})

export class WebsiteLayoutComponent {
  constructor(script: ScriptService){
    script.load('jquery1', 'jquery2', 'bootstrap', 'easing', 'hoverIntent', 'superfish',
                'wow', 'owl', 'magnific', 'sticky', 'main').then(data => {  }).catch(error => console.log(error));
  }
}
