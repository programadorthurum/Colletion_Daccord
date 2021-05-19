import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/artist';
import { ArtistService } from 'src/app/artist.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent implements OnInit {
  artists: Artist= new Artist();
  submitted = false;

  constructor(private router: Router, private artistService: ArtistService, 
              private http: HttpClient,) { }

  ngOnInit(): void {
  }

  save(){
    this.artistService.addArtist(this.artists).subscribe();
    this.saida();
    this.artistService.showMessage("Operação realizada com sucesso!!!")
  }

  saida(){
   this.router.navigate(["artists"])
  }
 
 onSubmit() {
   this.submitted = true;
   this.save();    
 }

 gotoList() {
   this.router.navigate(['artists']);
 }

 inputFileChange(event) {
   if (event.target.files && event.target.files[0]) {
     const foto = event.target.files[0];
     
     const formData = new FormData();
     formData.append('foto' , foto);

     this.http.post('http://localhost:4200/fotos', formData)
     .subscribe(resposta => console.log('upload ok!'));
   }
 }

}
