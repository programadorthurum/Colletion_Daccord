import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/artist';
import { ArtistService } from 'src/app/artist.service';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists : Artist[];

  displayedColumns = ['id', 'artist_name', 'artist_genre']
  constructor(private router: Router, private artistService: ArtistService) { }


  ngOnInit(): void {
    this.getArtists();
  }

  saida(): void{
    this.router.navigate(["/"])
  }
  getArtists(): void {
    this.artistService.getArtists()
    .subscribe(artists => this.artists = artists);
  }

  delete(artist: Artist): void {
    this.artists = this.artists.filter(h => h !== artist);
    this.artistService.deleteArtist(artist).subscribe();
  }

  updateArtist(){
    this.router.navigate(['/artist/update/consultar/'])
  }
}
