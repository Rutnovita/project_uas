<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Supaya bisa diakses dari Ionic
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host = "localhost";
$user = "root";
$password = "";
$dbname = "silomba";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Koneksi database gagal"]);
    exit();
}

// Ambil semua field
$nama_peserta = $_POST['nama_peserta'] ?? '';
$email = $_POST['email'] ?? '';
$telepon = $_POST['telepon'] ?? '';
$alamat = $_POST['alamat'] ?? '';
$kategori_lomba = $_POST['kategori_lomba'] ?? '';
$jenis_lomba = $_POST['jenis_lomba'] ?? '';
$keterangan = $_POST['keterangan'] ?? '';
$kategori_usia = $_POST['kategori_usia'] ?? '';
$tempat_lahir = $_POST['tempat_lahir'] ?? '';
$tanggal_lahir = $_POST['tanggal_lahir'] ?? '';
$asal_negara = $_POST['asal_negara'] ?? '';

// Validasi field wajib
if (
    empty($nama_peserta) ||
    empty($email) ||
    empty($telepon) ||
    empty($alamat) ||
    empty($kategori_lomba) ||
    empty($jenis_lomba)
) {
    echo json_encode(["success" => false, "message" => "Field wajib tidak lengkap"]);
    exit();
}

$sql = "INSERT INTO pendaftaran_lomba 
    (nama_peserta, email, telepon, alamat, kategori_lomba, jenis_lomba, keterangan, kategori_usia, tempat_lahir, tanggal_lahir, asal_negara) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssssssss",
    $nama_peserta,
    $email,
    $telepon,
    $alamat,
    $kategori_lomba,
    $jenis_lomba,
    $keterangan,
    $kategori_usia,
    $tempat_lahir,
    $tanggal_lahir,
    $asal_negara
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Data berhasil disimpan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menyimpan data", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
