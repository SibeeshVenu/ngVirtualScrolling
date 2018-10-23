import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';

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
  private length = 100000;
  private pageSize = 100;
  private cachedData = Array.from<Movie>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(Movie | undefined)[]>(this.cachedData);
  private subscription = new Subscription();

  constructor(private movieService: MovieService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Movie | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this.fetchPage(i);
      }
    }));
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);


    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this.movieService.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c412c072676d278f83c9198a32613b0d&language=en-US&page=1')
        .subscribe((data) => {
          this.dataStream.next(this.cachedData);
          this.formatDta(JSON.parse(data._body).results);
        });

    }, Math.random() * 1000 + 200);
  }
  formatDta(_body: Movie[]): any {
    this.dataStream.next(_body);
  }
}
