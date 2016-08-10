import { Page } from 'ionic-angular';
import {Component} from "@angular/core";
import { NavController, LoadingController } from 'ionic-angular';
import {PodcastService} from '../../providers/podcast-service/podcast-service';
import {Http, Headers} from '@angular/http';
import {AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider} from 'ionic-audio/dist/ionic-audio';

/*
  Generated class for the PodcastPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/podcast/podcast.html',
  directives: [AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent],
  providers: [PodcastService],
})
export class PodcastPage {
  public podcasts: any;
  myTracks: any[];
  allTracks: any[];
  loading: any;

  constructor(private nav: NavController, public podcastService: PodcastService, private _audioProvider: AudioProvider, public loadingCtrl: LoadingController) {
    this.nav = nav;
    this.presentLoadingMessage("Loading Podcast...");
    this.loadPodcasts();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Podcast...'
    });

    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  presentLoadingMessage(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();

    setTimeout(() => {
        this.loading.dismiss();
    }, 20000);
  }

  doRefresh(refresher) {
    this.loadPodcasts();

    setTimeout(() => {
      console.log('Refresh: Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  loadPodcasts() {
    this.podcastService.load()
      .then(data => {
        console.log(data);
        this.podcasts = data.map(function(post) {
          // The .map lets me take the original data and map it to the format the audio player wants
          return {
            title: post.title,
            date: post.pubDate,
            description: post.description,
            src: post.enclosure.url
          }
        });
        console.log(this.podcasts);
        this.loading.dismiss();
      }, (error) => {
        console.log("Ah! Error getting podcast!")
        this.loading.dismiss();
      });
  }

  trackIsLoading(index) {
    return this._audioProvider.tracks[index].isLoading;
  }
  trackIsPlaying(index) {
    return this._audioProvider.tracks[index].isPlaying;
  }
  trackHasError(index) {
    return this._audioProvider.tracks[index].error != null;
  }
  toggle(index) {
    if (this._audioProvider.tracks[index].isPlaying) {
      this._audioProvider.pause(index);
    } else {
      this._audioProvider.pause();
      this._audioProvider.play(index);
    }
  }
  pause(){
      this._audioProvider;
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }
}
