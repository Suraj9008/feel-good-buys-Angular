import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";
import { Route, ActivatedRoute } from "@angular/router";
import { SocialmediaService } from "../../../_services/socialmedia.service";
@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.scss"],
})
export class ImportComponent implements OnInit, AfterViewChecked {
  str: any;
  outlook = false;
  linkedin = false;
  facebook = false;
  sale = false;
  paramsObject: any;
  Facebook = 0;
  Linkedin = 0;
  Microsoft = 0;
  SurveyMonkey = 0;

  constructor(
    private router: ActivatedRoute,
    private socialmedia: SocialmediaService
  ) {}

  ngOnInit(): void {
    let facebook: any = this.router.snapshot.queryParamMap.get('facebook');
    if (this.Facebook < facebook) {
      this.Facebook = facebook;
    }
    let linkedin: any = this.router.snapshot.queryParamMap.get('linkedin');
    if (this.Linkedin < linkedin) {
      this.Linkedin = linkedin;
    }
    let surveymonkey: any = this.router.snapshot.queryParamMap.get('SurveyMonkey');
    if (this.SurveyMonkey < surveymonkey) {
      this.SurveyMonkey = surveymonkey;
    }
    
    let microsoft: any = this.router.snapshot.queryParamMap.get('microsoft');
    if (this.Microsoft < microsoft) {
      this.Microsoft = microsoft;
    }
    

    console.log(facebook, linkedin,surveymonkey, microsoft);
    
  }

  ngAfterViewChecked(): void {}

  linkedIns() {
    this.linkedin = true;
    console.log(this.str, "from linkedin");
    this.socialmedia.LinkedinToken(this.str).subscribe(
      (data: any) => {
        console.log(data);
        this.linkedin = false;
      },
      (error) => {
        console.log(error);
        this.linkedin = false;
      }
    );
  }

  facebooks() {
    this.facebook = true;
    this.socialmedia.facebookToken().subscribe(
      (data: any) => {
        this.str = data.toString();
        window.location.href = this.str.toString();
        this.facebook = false;
      },
      (error) => {
        console.log(error);
        this.facebook = false;
      }
    );
  }

  outlooks() {
    this.outlook = true;
    this.socialmedia.outlookToken().subscribe(
      (data: any) => {
        this.str = data.toString();
        window.location.href = this.str.toString();
        this.outlook = false;
      },
      (error) => {
        console.log(error);
        this.outlook = false;
      }
    );
  }

  sales() {
    this.sale = true;
    this.socialmedia.salesToken().subscribe(
      (data: any) => {
        this.str = data.toString();
        console.log(this.str);
        window.location.href = this.str.toString();
        this.sale = false;
      },
      (error) => {
        console.log(error);
        this.sale = false;
      }
    );
  }
}
