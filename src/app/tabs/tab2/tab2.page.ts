import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  formData = {
    nama_peserta: '',
    email: '',
    telepon: '',
    alamat: '',
    kategori_usia: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    asal_negara: '',
    kategori_lomba: '',
    jenis_lomba: '',
    keterangan: ''
  };

  jenisLombaOptions: string[] = [];

  constructor(
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  onKategoriChange() {
    if (this.formData.kategori_lomba === 'Perorangan') {
      this.jenisLombaOptions = [
        'Catur',
        'Badminton',
        'Tenis Meja',
        'Renang',
        'Panahan',
        'Karate',
        'Golf'
      ];
    } else if (this.formData.kategori_lomba === 'Beregu') {
      this.jenisLombaOptions = [
        'Futsal',
        'Basket',
        'Bola Voli',
        'Sepak Bola',
        'Badminton',
        'Tenis',
        'Hoki'
      ];
    } else {
      this.jenisLombaOptions = [];
    }
    this.formData.jenis_lomba = '';
  }

  async submitForm() {
    const url = 'http://localhost/silomba_api/insert.php';
    const body = new FormData();
    body.append('nama_peserta', this.formData.nama_peserta);
    body.append('email', this.formData.email);
    body.append('telepon', this.formData.telepon);
    body.append('alamat', this.formData.alamat);
    body.append('kategori_usia', this.formData.kategori_usia);
    body.append('tempat_lahir', this.formData.tempat_lahir);
    body.append('tanggal_lahir', this.formData.tanggal_lahir);
    body.append('asal_negara', this.formData.asal_negara);
    body.append('kategori_lomba', this.formData.kategori_lomba);
    body.append('jenis_lomba', this.formData.jenis_lomba);
    body.append('keterangan', this.formData.keterangan);

    this.http.post(url, body).subscribe(
      async () => {
        const toast = await this.toastController.create({
          message: 'Pendaftaran berhasil dikirim!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.formData = {
          nama_peserta: '',
          email: '',
          telepon: '',
          alamat: '',
          kategori_usia: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          asal_negara: '',
          kategori_lomba: '',
          jenis_lomba: '',
          keterangan: ''
        };
        this.jenisLombaOptions = [];
      },
      async () => {
        const toast = await this.toastController.create({
          message: 'Gagal mengirim data',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }
}
