import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

import { mahasiswaList } from "@/Data/Dummy";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  // Hanya gunakan SATU deklarasi state untuk mahasiswa
  const [mahasiswa, setMahasiswa] = useState([]);
  
  // State untuk form dan modal
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  // Simulasi fetch API
  const fetchMahasiswa = async () => {
    // Bisa disimulasikan delay atau nanti diganti fetch API
    setMahasiswa(mahasiswaList);
  };
  
  useEffect(() => {
    setTimeout(() => fetchMahasiswa(), 500);
  }, []);

  // Handler untuk menambah data
  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };
  
  // Handler untuk mengubah data
  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) => 
      mhs.nim === nim ? { ...mhs, ...newData } : mhs
    );
    setMahasiswa(updated);
  };
  
  // Handler untuk menghapus data
  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

  // Handler perubahan input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler saat form disubmit
  const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.nim || !form.nama) {
    toastError("NIM dan Nama wajib diisi");
    return;
  }

  if (isEdit) {
    confirmUpdate(() => {
      updateMahasiswa(form.nim, form);
      toastSuccess("Data berhasil diperbarui");
      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    });
  } else {
    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }
    addMahasiswa(form);
    toastSuccess("Data berhasil ditambahkan");
    setForm({ nim: "", nama: "" });
    setIsModalOpen(false);
  }
};

  // Handler membuka modal tambah
  const openAddModal = () => {
    setIsModalOpen(true);
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
  };

  // Handler membuka modal edit
  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // Handler konfirmasi hapus
  const handleDelete = (nim) => {
      confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>

        <MahasiswaTable
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
        />
      </Card>
      
      {isModalOpen && (
        <MahasiswaModal
	      isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Mahasiswa;