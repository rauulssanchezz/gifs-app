import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = '3ETcJoP5p5J4hr7q3uJeeC5MldGQaYQP';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizedHistory(tag:string){
    tag=tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
  }

  searchTag(tag: string):void{
    if(tag.length === 0){
      return;
    }
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','8')
      .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp=> {
        this.gifList = resp.data;
      })

  }
}
