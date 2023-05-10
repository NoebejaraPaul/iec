import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
// import { PostDetailsComponent } from './modules/post-details/post-details.component';
// import { PostListComponent } from './modules/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { PostsComponent } from './modules/posts/posts.component';
//import { SharedModule } from './shared/shared.module';

// import { DefaultModule } from './app/layouts/default/default.module';


@NgModule({
  declarations: [
    AppComponent,
    // PostDetailsComponent,
    // PostListComponent,
    //PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ReactiveFormsModule,
    //SharedModule,
    
  ],
  // exports: [
  //   PostDetailsComponent,
  //   PostDetailsComponent // This line is important!
  // ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
