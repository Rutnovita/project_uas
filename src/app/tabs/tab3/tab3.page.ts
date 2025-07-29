import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  pendaftarList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('http://localhost/silomba_api/get.php').subscribe(
      (data) => {
        this.pendaftarList = data;
        console.log('Data berhasil diambil:', data);
      },
      (error) => {
        console.error('Gagal mengambil data', error);
      }
      
    );
  }
}
