import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { AppartmentsModule } from './components/apartments/appartments.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MessageModule } from './components/message/message.module';
import { PaymentsModule } from './components/payments/payments.module';
import { AdminsModule } from './components/admins/admins.module';
import { RolesModule } from './components/roles/roles.module';
import { WorkersModule } from './components/workers/workers.module';

import { AuthorizationModule } from './components/authorization/authorization.module';
import { CancelInquire2Module } from './components/cancel-inquire2/cancel-inquire2.module';
import { CheckoutInqqModule } from './components/checkout-inqq/checkout-inqq.module';

import { OwnersModule } from './components/owners/owners.module';
import { InquiriesModule } from './components/inquiries/inquiries.module';
import { IssuReportsModule } from './components/issueReports/issu-reports.module';
import { UnlegalModule } from './components/unlegal/unlegal.module';
import { PartnerModule } from './components/partner/partner.module';
import { ConfigurationsModule } from './components/configurations/configurations.module';
import { AdsModule } from './components/configurations/ads/ads.module';
import { FaqqModule } from './components/configurations/faqq/faqq.module';
import { AppMsgsModule } from './components/appmsgs/appmsgs.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PathLocationStrategy } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { PushmsgsModule } from './components/pushmsgs/pushmsgs.module';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, StatisticsComponent],
  imports: [
    AppRoutingModule,
    IssuReportsModule,
    ConfigurationsModule,
    BrowserModule,CheckoutInqqModule,
    AuthorizationModule,
    CancelInquire2Module,
    AdminsModule,
    UnlegalModule,
    AdsModule,
    FaqqModule,
    HttpClientModule,
    InquiriesModule,
    PartnerModule,
    WorkersModule,
    PaymentsModule,
    RolesModule,
    FormsModule,
    SharedModule,
    AppartmentsModule,
    ReactiveFormsModule,
    CalendarModule,
    DashboardModule,
    MessageModule,
    AuthModule,
    UserModule,
    OwnersModule,
    GoogleMapsModule,
    BadgeModule,
    FontAwesomeModule,
    AppMsgsModule,ChartModule,
    PushmsgsModule,
    BlockUIModule.forRoot({
      delayStart: 1,
      delayStop: 500,
      message: 'Please Wait ,,,,',
    }),
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true,
    }),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule, JwtInterceptor, PathLocationStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
