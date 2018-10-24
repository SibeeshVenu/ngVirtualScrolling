import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';
import { config } from '../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {
  constructor(private movieService: MovieService) {
  }
  ds = new MyDataSource(this.movieService);
}

export class MyDataSource extends DataSource<Movie | undefined> {
  private initialData: Movie[] = [
    {
      id: 19404,
      title: 'Dilwale Dulhania Le Jayenge',
      overview: 'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
      poster_path: '\/uC6TTUhPpQCmgldGyYveKRAu8JN.jpg'
    }
  ];
  private dataStream = new BehaviorSubject<(Movie | undefined)[]>(this.initialData)
  private subscription = new Subscription();

  constructor(private movieService: MovieService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Movie | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe((range) => {
      this.movieService.get(config.api.topRated)
        .subscribe((data) => {
          this.formatDta(JSON.parse(data._body).results);
        });
    }));
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  formatDta(_body: Movie[]): void {
    this.dataStream.next(_body);
  }
}
