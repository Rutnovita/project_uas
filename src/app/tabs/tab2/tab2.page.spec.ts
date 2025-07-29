import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    alamat: '',
    telepon: '',
    kategori_lomba: '',
    jenis_lomba: '',
    keterangan: ''
  };

  jenisLombaOptions: string[] = [];

  constructor(private toastController: ToastController) {}

  onKategoriChange() {
    if (this.formData.kategori_lomba === 'Perorangan') {
      this.jenisLombaOptions = [
        'Catur',
        'Bulutangkis',
        'Renang',
        'Tenis Meja',
        'Atletik'
      ];
    } else if (this.formData.kategori_lomba === 'Beregu') {
      this.jenisLombaOptions = [
        'Sepak Bola',
        'Bola Voli',
        'Basket',
        'Futsal',
        'Hockey'
      ];
    } else {
      this.jenisLombaOptions = [];
    }
    // Reset pilihan jenis_lomba
    this.formData.jenis_lomba = '';
  }

  async submitForm() {
    console.log('Data dikirim:', this.formData);

    const toast = await this.toastController.create({
      message: 'Pendaftaran berhasil dikirim!',
      duration: 2000,
      color: 'success'
    });
    toast.present();

    // Reset form
    this.formData = {
      nama_peserta: '',
      email: '',
      telepon: '',
      alamat: '',
      kategori_lomba: '',
      jenis_lomba: '',
      keterangan: ''
    };
    this.jenisLombaOptions = [];
  }
}
