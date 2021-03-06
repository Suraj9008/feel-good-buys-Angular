import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var jQuery: any;
@Component({
  selector: 'app-email',
  templateUrl:'./email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  public Editor = ClassicEditor;

  template = `<div class="row">
  <div class="col">
  </div>
  <div class="col">
    <div class="card" style="width: 25rem;">
        <img src="https://i.pinimg.com/originals/ba/ee/7d/baee7d789ce0a5724025683d7eb99ce1.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Congratulation !!!</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Verify Email</a>
        </div>
      </div>    
  </div>
  <div class="col">
  </div>
</div>
</div>`
  @Input() searchDataSource: Array<any>;
  @Output() userSelectedResult: EventEmitter<object>;
  @Output() closeSearchEvent: EventEmitter<boolean>;

  @ViewChild('filterInput') public userInput: ElementRef;
  @ViewChild('filterList') public filterList: ElementRef;
  resultDataList: Array<any>;

  constructor() {
    this.userSelectedResult = new EventEmitter<object>();
    this.closeSearchEvent = new EventEmitter<boolean>();
  }

ngOnInit() {
    setTimeout(() => {
      const userInputHTMLElement: HTMLElement = this.userInput.nativeElement;
      userInputHTMLElement.focus();
    });
    jQuery(document).ready(function() {
      jQuery('.js-example-basic-multiple').select2();
  });
  }

  searchQueryOnDataSource($event): void {
    if ($event.target.value.length >= 2) {
      this.resultDataList = [];

      this.enableSearch().then((dataSource) => {
        this.doQuerySearch(dataSource, $event.target.value);
      });
    } else {
      setTimeout(() => {
        const filterListHTMLElement: HTMLElement = this.filterList.nativeElement;
        filterListHTMLElement.style.backgroundColor = 'transparent';
      });

      this.resultDataList = [];
    }
  }

  enableSearch(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.searchDataSource.map(item => Object.assign({}, item)));
    });
  }

  private doQuerySearch(dataArray: Array<any>, queryString: string): void {
    setTimeout(() => {
      const filterListHTMLElement: HTMLElement = this.filterList.nativeElement;
      filterListHTMLElement.style.backgroundColor = '#fff';
    });

    for (const element of dataArray) {
      const feature = element;
      if (feature.name.toLowerCase().search(queryString.toLowerCase()) !== -1) {
        this.resultDataList.push(feature);
      }
    }

    if (this.resultDataList.length === 0) {
      const feature = {
        name:  'No results found for ' + queryString + '. Please enter a different search criteria.'
      };
      this.resultDataList.push(feature);
    }

    for (const element of this.resultDataList) {
      const feature = element;
      const regex = new RegExp( '(' + queryString + ')', 'gi' );
      let updatedText: string;
      if (this.resultDataList.length > 0) {
        updatedText = feature.name.replace(regex, '<strong>' + queryString + '</strong>');
      }
      feature.originalText = feature.name;
      feature.name = updatedText;
    }
  }

  selectedResult(result: any): void {
    this.userInput.nativeElement.value = result.originalText;
    this.userSelectedResult.emit({
      target: (result || null)
    });

    this.resultDataList = [];
  }

  closeSearch(): void {
    this.closeSearchEvent.emit(true);
  }


  Addcc(){
      
  }

}
