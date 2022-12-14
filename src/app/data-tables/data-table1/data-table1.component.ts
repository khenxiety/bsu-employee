import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddEmployeeComponent } from 'src/app/modals/add-employee/add-employee.component';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { UpdateEmployeeComponent } from 'src/app/modals/update-employee/update-employee.component';
import {
  collection,
  addDoc,
  Firestore,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

import * as XLSX from 'xlsx';
import { DeleteFacultyComponent } from 'src/app/modals/delete-faculty/delete-faculty.component';
import { Router } from '@angular/router';

export interface DataTable1Item {
  name: string;
  id: number;
  email: any;
  ft_or_tp: any;
  age: any;
  sex: any;
  baccalaureate: any;
  ba_spec: any;
  masters: any;
  ma_spec: any;
  doctorate: any;
  Ph_D_Spec: any;
  professional_licensure_earned: any;
  tenure_of_appointment: any;
  rank: any;
  teaching_load: any;
  subjects_Taught: any;
  annual_salary: any;
  place_of_origin: any;
  date_of_birth: any;
  date_of_original_Appointment: any;
  school_graduated: any;
  educational_attainment: any;
  civil_status: any;
  sub_type: any;
}

@Component({
  selector: 'app-data-table1',
  templateUrl: './data-table1.component.html',
  styleUrls: ['./data-table1.component.scss'],
})
export class DataTable1Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTable1Item>;
  dataSource: MatTableDataSource<DataTable1Item>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'ft_or_tp',
    
    'sex',
    'baccalaureate',
    'ba_spec',
    'masters',
    'ma_spec',
    'doctorate',
    'Ph_D_Spec',
    'professional_licensure_earned',
    'tenure_of_appointment',
    'rank',
    'teaching_load',


    'subjects_Taught',
    'annual_salary',
    'actions',
  ];

  email: any;
  ft_or_tp: any;
  age: any;
  sex: any;
  baccalaureate: any;
  ba_spec: any;
  masters: any;
  ma_spec: any;
  doctorate: any;
  Ph_D_Spec: any;
  professional_licensure_earned: any;
  tenure_of_appointment: any;
  rank: any;
  teaching_load: any;
  subjects_Taught: any;
  annual_salary: any;
  place_of_origin: any;
  date_of_birth: any;
  date_of_original_Appointment: any;
  school_graduated: any;
  educational_attainment: any;
  civil_status: any;

  fileName = 'Faculty List Form A (Permanent Lecturer).xlsx';

  faculty: any;
  data: any;

  search: any;

  department_filter: any;

  length: any;

  faculty_sorted:any;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private modal: MatDialog,
    private firestore: Firestore,
    private router:Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    const token = localStorage.getItem('token');

    const dbinstance = collection(this.firestore, 'employees');
    getDocs(dbinstance)
      .then((res: any) => {
        
        this.faculty = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.faculty = this.faculty.filter(
          (item: { sub_type: string }) => item.sub_type == 'permanent'
        );
        this.length = this.faculty.length;

        this.faculty_sorted=this.faculty.sort((a:any, b:any) => a['name'] > b['name'] ? 1 : a['name'] === b['name'] ? 0 : -1);



        this.dataSource.data = this.faculty_sorted as DataTable1Item[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }

  filterDept(res: any) {
    this.faculty = this.faculty.filter(
      (item: { department: string }) => item.department == res
    );

    this.dataSource.data = this.faculty as DataTable1Item[];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.toast.success('Department Filtered to', res);
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

    location.reload();
  }
  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal() {
    let modal = this.modal
      .open(AddEmployeeComponent, {
        width: '90vw',
        data: {
          type: 'teaching-staff',
          sub_type: 'permanent',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this.ngAfterViewInit();
      });
  }
  openFilterModal() {
    let modal = this.modal
      .open(FilterModalComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == 'All' || res == undefined) {
          this.ngAfterViewInit();
        } else {
          this.filterDept(res);
        }

        console.log(this.faculty);

        console.log(res);
      });
  }

  deleteEmployee(id: any) {
    // const token = localStorage.getItem('token');

    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer ' + token,
    // });

    // try {
    //   this.http
    //   .delete('http://127.0.0.1:8000/api/admin/user/delete/' + id, {
    //     headers: headers,
    //   })
    //   .subscribe((res: any) => {

    //     this.toast.success('Successfully Deleted', res.message);
    //     this.ngAfterViewInit();
    //   });

    // } catch (error) {
    //   console.log(error);

    // }

    const deleteDocs = doc(this.firestore, 'employees', id);
    deleteDoc(deleteDocs)
      .then((res: any) => {
        this.toast.success('Post Deleted');
        this.ngAfterViewInit();
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }

  openModalUpdate(data: any) {
    const dialogRef = this.modal
      .open(UpdateEmployeeComponent, {
        width: '90vw',
        hasBackdrop: true,
        data: {
          data: data,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this.ngAfterViewInit();
        location.reload()
      });
  }

  openDeleteModal(data: any) {
    const dialogRef = this.modal
      .open(DeleteFacultyComponent, {
        hasBackdrop: true,
        data: {
          data: data,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this.ngAfterViewInit();
      });
  }



  viewProfile(id:any){

    this.router.navigate(['/admin/faculty/profile/'+id]);


  }
}
