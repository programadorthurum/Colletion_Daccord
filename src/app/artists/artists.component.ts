import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists : Artist[];

  constructor(private router: Router, private artistService: ArtistService ) { }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(): void {
    this.artistService.getArtists()
    .subscribe(artists => this.artists = artists);
  }

  add(artist_name: string): void {
    artist_name = artist_name.trim();
    if (!artist_name) { return; }
    this.artistService.addArtist({ artist_name } as Artist)
      .subscribe(artist => {
        this.artists.push(artist);
      });
  }

  delete(artists : Artist): void {
    this.artists = this.artists.filter(h => h !== artists);
    this.artistService.deleteArtist(artists).subscribe();
  }

  navigateToArtistCreate(): void{
    this.router.navigate(['/artists/create'])
   }

   navigateToArtistListar(): void{
    this.router.navigate(['/artists/listar'])
   }

   navigateToArtistSearch(){
     this.router.navigate(['/artists/search'])
   }

   navigateToArtistUpdate(){
     this.router.navigate(['/artists/update'])
   }
   
   mostraLista() {
    this.router.navigate(['artists']);
  }

  saida(): void{
    this.router.navigate(["artists"])
  }

}

