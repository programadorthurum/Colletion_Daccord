import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '../configuration';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(private router: Router, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
  }

  navigateToUserCreate(): void{
    this.router.navigate(['/user/'])
   }


}
