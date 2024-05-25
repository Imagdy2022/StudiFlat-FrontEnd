import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins/admins.service';
import { ApartmentService } from 'src/app/_services/apartments/apartment.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  showSide: string = '';
  Date: string = 'All';
  requestRate: boolean = true;
  paymentHistoryRate: string = 'All';
  apartmentRate: boolean = true;
  userProblem: boolean = true;
  DemandsRate: boolean = true;
  subscriptions: Subscription[] = [];
  listDropDown: Array<object> = [
    { name: 'All' },
    { name: 'Today' },
    { name: 'Last week' },
    { name: 'This month' },
    { name: 'This year' },
  ];

  listDropDownTenantpaymenthistory: Array<object> = [
    { name: 'All' },
    { name: 'Excellent' },
    { name: 'Good' },
    { name: 'Poor' },
  ];
  listDropDownRequests: Array<object> = [
    { name: 'Highest' },
    { name: 'Lowest' },
  ];
  ApartmentRatingsDropDown: Array<object> = [
    { name: 'Highest' },
    { name: 'Lowest' },
  ];
  listDropDownUserProblem: Array<object> = [
    { name: 'Highest' },
    { name: 'Lowest' },
  ];
  listDropDownApartmentDemands: Array<object> = [
    { name: 'Highest' },
    { name: 'Lowest' },
  ];

  rowDatalistTenantpaymenthistory: Array<any> = [];
  ApartmentRatings: Array<any> = [];
  rowDatalistRequests: Array<any> = [];
  rowDatalistDemands: Array<any> = [];

  rowdataListUserreportproblems: Array<any> = [];
  //----------------- Islam Statics Cards ------------------//
  listDropDownApartment: Array<object> = [
    { name: 'Requests' },
    { name: 'Issues' },
    { name: 'Ratings' },
    { name: 'Termination' },
  ];
  listDropDownWorker: Array<object> = [{ name: 'Issues' }, { name: 'Profit' }];
  listDropDownTenant: Array<object> = [
    { name: 'Report Issues' },
    { name: 'Bookings' },
    { name: 'Nationality' },
  ];

  listDropDownOrderBy: Array<object> = [
    { name: 'Highest' },
    { name: 'Lowest' },
  ];

  //----------------- Islam Statics Cards ------------------//
  constructor(public router: Router, private _adminservices: AdminsService) {}
  ngOnInit(): void {
    this.checkRole();
    this.GetIncomeOutcome();
    this.ApartmentRequests();
    this.PaymentHistory();
    this.ApartmentRating();
    this.UserProblems();
    this.ApartmentDemands();
    this.ApartmentCard();
    this.OwnerCards();
    this.AgencyCard();
    this.GetWorkerCard();
    this.GetTenantCards();
    this.AnaylsisChartApi();
  }

  StatisticsRole: any;
  is_Super: any;
  checkRole() {
    const data = localStorage.getItem('user');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      this.is_Super = parsedData.is_Super;
      if (parsedData.is_Super == false) {
        for (let i = 0; i < parsedData.permissions.length; i++) {
          if (parsedData.permissions[i].page_Name == 'Statistics') {
            this.StatisticsRole = parsedData.permissions[i];
          }
        }
        if (this.StatisticsRole.p_Add == false && this.is_Super == false) {
          let url: string = 'unlegal';
          this.router.navigateByUrl(url);
        }
      }
    }
  }

  StatisticsCards: any = {};
  GetIncomeOutcome() {
    this.subscriptions.push(
      this._adminservices.GetIncomeOutcome().subscribe(
        (res: any) => {
          this.StatisticsCards = res;
        },
        (error) => {}
      )
    );
  }

  ApartmentRequests() {
    this.subscriptions.push(
      this._adminservices.ApartmentRequests(this.requestRate).subscribe(
        (res: any) => {
          this.rowDatalistRequests = res;
        },
        (error) => {}
      )
    );
  }
  ApartmentDemands() {
    this.subscriptions.push(
      this._adminservices.ApartmentRequests(this.DemandsRate).subscribe(
        (res: any) => {
          this.rowDatalistDemands = res;
        },
        (error) => {}
      )
    );
  }
  PaymentHistory() {
    this.subscriptions.push(
      this._adminservices.PaymentHistory(this.paymentHistoryRate).subscribe(
        (res: any) => {
          this.rowDatalistTenantpaymenthistory = res;
        },
        (error) => {}
      )
    );
  }

  ApartmentRating() {
    this.subscriptions.push(
      this._adminservices.ApartmentRating(this.apartmentRate).subscribe(
        (res: any) => {
          this.ApartmentRatings = res;
        },
        (error) => {}
      )
    );
  }

  UserProblems() {
    this.subscriptions.push(
      this._adminservices.UserProblems(this.userProblem).subscribe(
        (res: any) => {
          this.rowdataListUserreportproblems = res;
        },
        (error) => {}
      )
    );
  }

  addItem(value: any) {
    this.showSide = value;
  }
  selectedfromDropDown(value: any) {
    this.Date = value.name;
  }

  selectedApartmentsRequests(value: any) {
    if (value.name == 'Highest') this.requestRate = true;
    else this.requestRate = false;
    this.ApartmentRequests();
  }
  selectedApartmentDemands(value: any) {
    if (value.name == 'Highest') this.DemandsRate = true;
    else this.DemandsRate = false;
    this.ApartmentDemands();
  }

  selectedPaymentHistory(value: any) {
    this.paymentHistoryRate = value.name;
    this.PaymentHistory();
  }
  selectedApartmentsRateing(value: any) {
    if (value.name == 'Highest') this.apartmentRate = true;
    else this.apartmentRate = false;
    this.ApartmentRating();
  }

  selectedUserProblem(value: any) {
    if (value.name == 'Highest') this.userProblem = true;
    else this.userProblem = false;
    this.UserProblems();
  }
  //----------------- Islam Cards ------------------//
  ModuleName: string = 'Requests';
  WorkerModuleName: string = 'Issues';
  WorkerCard: any;
  OrderBy: boolean = true;
  ApartmentCards: any;
  OwnerCard: any;
  PartnerCard: any;
  TenantModuleName: string = 'Bookings';
  TenantCard: any;
  SelectApartmentModule(value: any) {
    this.ModuleName = value.name;
    this.OrderBy = true;
    this.ApartmentCard();
  }
  SelectWorkerModule(value: any) {
    this.WorkerModuleName = value.name;
    this.OrderBy = true;
    this.GetWorkerCard();
  }
  SelectApartmentOrderby(value: any) {
    if (value.name == 'Highest') this.OrderBy = true;
    else this.OrderBy = false;

    this.ApartmentCard();
  }
  SelectOwnerOrderby(value: any) {
    if (value.name == 'Highest') this.OrderBy = true;
    else this.OrderBy = false;
    this.OwnerCards();
  }
  SelectPartnerOrderby(value: any) {
    if (value.name == 'Highest') this.OrderBy = true;
    else this.OrderBy = false;
    this.AgencyCard();
  }
  SelectWorkerOrderby(value: any) {
    if (value.name == 'Highest') this.OrderBy = true;
    else this.OrderBy = false;
    this.GetWorkerCard();
  }

  SelectTenantModule(value: any) {
    this.TenantModuleName = value.name;
    this.OrderBy = true;
    this.GetTenantCards();
  }

  SelectTenantOrderby(value: any) {
    if (value.name == 'Highest') this.OrderBy = true;
    else this.OrderBy = false;
    this.GetTenantCards();
  }
  ApartmentCard() {
    this.subscriptions.push(
      this._adminservices
        .ApartmentCard(this.ModuleName, this.OrderBy)
        .subscribe(
          (res: any) => {
            this.ApartmentCards = res;
          },
          (error) => {}
        )
    );
  }
  OwnerCards() {
    this.subscriptions.push(
      this._adminservices.OwnerCard(this.OrderBy).subscribe(
        (res: any) => {
          this.OwnerCard = res;
        },
        (error) => {}
      )
    );
  }
  AgencyCard() {
    this.subscriptions.push(
      this._adminservices.AgencyCard(this.OrderBy).subscribe(
        (res: any) => {
          this.PartnerCard = res;
        },
        (error) => {}
      )
    );
  }
  GetWorkerCard() {
    this.subscriptions.push(
      this._adminservices
        .WorkerCard(this.WorkerModuleName, this.OrderBy)
        .subscribe(
          (res: any) => {
            this.WorkerCard = res;
          },
          (error) => {}
        )
    );
  }
  GetTenantCards() {
    this.subscriptions.push(
      this._adminservices
        .TenantCard(this.TenantModuleName, this.OrderBy)
        .subscribe(
          (res: any) => {
            this.TenantCard = res;
          },
          (error) => {}
        )
    );
  }

  //--------------------------------------//

  //--------------- Chart Implementation ----------//
  Y_Revenue_Axis: any;
  Y_Expense_Axis: any;
  Y_Profit_Axis: any;
  Chart_Module: string = 'Requests';
  X_Axis: any;
  Y_Axis: any;
  ChartData: any;
  rangeDates: Date[];
  y_Profit_Axis: [];
  y_Expense_Axis: [];
  y_Revenue_Axis: [];
  financedataset: Array<object>;

  ListDropDownAnalysis: Array<object> = [
    { name: 'Requests' },
    { name: 'Bookings' },
    { name: 'Agencies' },
    { name: 'Users' },
    { name: 'Apartments' },
    { name: 'Finance' },
  ];
  SelectAnalysisModule(event: any) {
    this.Chart_Module = event.name;
    this.AnaylsisChartApi();
  }
  data: any;

  options: any;
  ModuelChartClick(module: any) {
    // console.log(this?.rangeDates[0]);
    this.subscriptions.push(
      this._adminservices
        .AnalysisChart(
          module,
          this?.rangeDates ? this.rangeDates[0].toISOString() : null,
          this?.rangeDates ? this.rangeDates[1].toISOString() : null
        )
        .subscribe(
          (res: any) => {
            this.ChartData = res;
            this.Chart_Module = module;
            this.y_Expense_Axis = res.y_Expense_Axis;
            this.y_Profit_Axis = res.y_Profit_Axis;
            this.y_Revenue_Axis = res.y_Revenue_Axis;
            this.Chart_Module === 'Finance'
              ? this.AnalysisChartFinance()
              : this.AnalysisChart();
          },
          (error) => {}
        )
    );
  }
  AnaylsisChartApi() {
    this.subscriptions.push(
      this._adminservices
        .AnalysisChart(this.Chart_Module, null, null)
        .subscribe(
          (res: any) => {
            this.ChartData = res;
            this.AnalysisChart();
          },
          (error) => {}
        )
    );
  }
  dataset: any;
  AnalysisChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: this.ChartData.x_Axis,
      datasets: [
        {
          label: this.Chart_Module,
          data: this.ChartData.y_Axis,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          backgroundColor: 'rgba(153,204,255,0.8)',
        },
      ],
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    console.log(this.Chart_Module);
    console.log(this.data);
  }
  AnalysisChartFinance() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: this.ChartData.x_Axis,
      datasets: [
        {
          label: 'Revenue',
          data: this.y_Revenue_Axis,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Expense',
          data: this.y_Expense_Axis,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500'),
        },
        {
          label: 'Profit',
          data: this.y_Profit_Axis,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
  //----------------------------------------------//
  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++)
      this.subscriptions[i].unsubscribe();
  }
}
