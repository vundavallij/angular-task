import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataserviceService } from '../dataservice.service'
import { OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

export interface showPayloads {
  customers: any;
  position: number;
  manufacturer: any;
  nationality: any;
  payload_id: any;
  payload_mass_kg: any;
  payload_mass_lbs: any;
  payload_type: any;
  orbit: any;
}

export interface historyData {
  id: any
  details: any
  event_date_unix: any
  event_date_utc: any
  flight_number: any
  title: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular-Task';
  displayedColumns: string[] = ['position', 'customers', 'manufacturer', 'nationality', 'payload_id',
    'payload_mass_kg', 'payload_mass_lbs', 'payload_type', 'orbit'];
  historyColumns: string[] = ['id', 'details', 'event_date_unix', 'event_date_utc', 'flight_number', 'title'];

  public dataSource = new MatTableDataSource<showPayloads>();
  public historyData = new MatTableDataSource<historyData>();
  public showTable: boolean = false;

  @ViewChild('table', { static: false }) public table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();



  constructor(readonly dataService: DataserviceService) {

  }
  public ngOnInit(): void {
    this.showData();
  }


  public showData() {
    this.dataService.getPayLoadData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginators.toArray()[0];
    })
  }

  public onTabClick($event) {
    console.log('eve', $event);
    if ($event.index === 1) {
      this.showHistory();
    }
  }

  public showHistory() {
    this.dataService.getHistory().subscribe((historyData) => {
      this.historyData = new MatTableDataSource(historyData);
      this.historyData.paginator = this.paginators.toArray()[1];

    })
  }
}
