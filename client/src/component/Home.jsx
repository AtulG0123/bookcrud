import React from 'react'
import { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import {toast} from 'react-toastify'
import api from "../api/axios";

function Home() {
  const getToken = () => {
    return JSON.parse(localStorage.getItem("userAuth"))?.token;//Token and pass this fun to Authrization
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddBook = async () => {
    try {
      const { data } = await api.post("/Book/addBook", formData);
      if (data.success) {
        toast.success(data.message);
        setBooks((prev) => [...prev, data.data]);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      // If token expired, your Axios interceptor will handle logout
    }
  };

  const resetForm=()=>{
    setFormData({
      BookName: "",
      BookTitle: "",
      Author: "",
      SellingPrice: "",
      PublishDate: "",
    });
  }

  //Display All Books
  const [books , setBooks]=useState([])
  useEffect(()=>{
    getBookData();
  },[])

  const getBookData = async () => {
    try {
      const { data } = await api.get("/Book/getBooks");
      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch books");
      // Axios interceptor will handle 401/403 automatically
    }
  };


  //Delete book Data
  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/Book/deleteBooks/${id}`);
      if (data.success) {
        toast.success(data.message);
        setBooks((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };


  //update books 
  const [isEditMode, setIsEditMode]= useState(false)
  const [editBookId, setEditBookId]=useState("")
  const handleEdit = (book) => {
    setIsEditMode(true);
    setEditBookId(book._id);

    setFormData({
      BookName: book.BookName,
      BookTitle: book.BookTitle,
      Author: book.Author,
      SellingPrice: book.SellingPrice,
      PublishDate: book.PublishDate
        ? new Date(book.PublishDate).toISOString().slice(0, 10)
        : "",
    });
  };

   const handleUpdate = async () => {
  try {
    const { data } = await api.put(`/Book/updateBook/${editBookId}`, formData);
    if (data.success) {
      toast.success(data.message);
      setBooks((prev) =>
        prev.map((b) => (b._id === editBookId ? data.data : b))
      );
      setIsEditMode(false);
      setEditBookId("");
      resetForm();
    } 
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  }
};



  return (
    <>
      <Navbar/>
      <div className="w-full px-5 min-h-[calc(100vh-60px)]">
        <div className="w-full grid grid-cols-5 my-5 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Book Name</label>
            <input
              type="text"
              placeholder="Book Name"
              className="w-full border-2 border-gray-300 rounded-sm outline-none h-8 px-2"
              name="BookName"
              value={formData.BookName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Book Title</label>
            <input
              type="text"
              placeholder="Book Title"
              className="w-full border-2 border-gray-300 rounded-sm outline-none h-8 px-2"
              name="BookTitle"
              value={formData.BookTitle}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Author</label>
            <input
              type="text"
              placeholder="Author"
              className="w-full border-2  border-gray-300 rounded-sm outline-none h-8 px-2"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Selling Price</label>
            <input
              type="text"
              placeholder="Selling Price"
              className="w-full border-2 border-gray-300 rounded-sm outline-none h-8 px-2"
              name="SellingPrice"
              value={formData.SellingPrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Publish Date</label>
            <input
              type="date"
              placeholder="Publish Date"
              className="w-full border-2 border-gray-300 rounded-sm outline-none h-8 px-2"
              name="PublishDate"
              value={formData.PublishDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            type='button'
            className="border-2 border-gray-500 rounded-sm px-4 py-1 cursor-pointer hover:bg-gray-600 hover:text-white"
            onClick={isEditMode ? handleUpdate : handleAddBook}
          >
            {isEditMode ? "update Book " : "Add Book"}
          </button>
        </div>
        {/* Table */}
        <div className="w-full mt-10">
          <table className="w-full bg-white divide-y divide-gray-300 border-2 border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={index} className="hover:bg-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {book.BookName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {book.BookTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {book.Author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {book.SellingPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {book.PublishDate
                        ? new Date(book.PublishDate).toISOString().slice(0, 10)
                        : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-700 flex gap-4">
                      <div
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDelete(book._id)}
                      >
                        <MdDelete />
                      </div>
                      <div
                        className="cursor-pointer text-blue-500"
                        onClick={() => handleEdit(book)}
                      >
                        <MdEdit />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No books available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home