import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ThreeTestComponent } from './three-test/three-test.component';

const routes: Routes = [
  {
    path: 'three-test',
    component: ThreeTestComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ThreeTestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
