import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosinstance";
import "./Home.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    _id: "",
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setUpdating] = useState(false);

  // ================= GET ALL BOOKS =================
  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("/booklists");
      setBookList(data?.BookList || []);
    } catch (error) {
      console.log("Fetch Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  // ================= INPUT CHANGE =================
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ADD BOOK =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { BookName, BookTitle, Author, SellingPrice } = bookForm;

    if (!BookName || !BookTitle || !Author || !SellingPrice) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await bookBaseUrl.post("/addbook", bookForm);

      alert("Book Added Successfully");

      resetForm();
      getAllbookList();
    } catch (error) {
      console.log("Submit Error:", error.response?.data || error.message);
    }
  };

  // ================= DELETE BOOK =================
  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("/deletebook", { id });

      if (data?.success) {
        alert(data.message);
        getAllbookList();
      } else {
        alert(data?.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };

  // ================= EDIT BUTTON CLICK =================
  const handleEdit = (book) => {
    setUpdating(true);
    setBookForm(book);
  };

  // ================= UPDATE BOOK =================
  const handleUpdateSubmit = async () => {
    try {
      const { data } = await bookBaseUrl.put("/Updatebook", bookForm);

      if (data?.success || data?.Success) {
        alert("Book Updated Successfully");

        setUpdating(false);
        resetForm();
        getAllbookList();
      }
    } catch (error) {
      console.log("Update Error:", error.response?.data || error.message);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setBookForm({
      _id: "",
      BookName: "",
      BookTitle: "",
      Author: "",
      SellingPrice: "",
      PublishDate: "",
    });
  };

  // ================= UI =================
  return (
    <div className="Home">
      {/* FORM */}
      <div className="fill_data">
        <div className="data-item">
          <label>Book Name</label>
          <input
            type="text"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>

        <div className="data-item">
          <label>Book Title</label>
          <input
            type="text"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>

        <div className="data-item">
          <label>Author</label>
          <input
            type="text"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>

        <div className="data-item">
          <label>Selling Price</label>
          <input
            type="number"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>

        <div className="data-item">
          <label>Publish Date</label>
          <input
            type="date"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="button">
        <button
          className={`btn ${isUpdating ? "btn-warning" : "btn-success"}`}
          onClick={isUpdating ? handleUpdateSubmit : handleSubmit}
        >
          {isUpdating ? "Update Book" : "Submit Book"}
        </button>

        {isUpdating && (
          <button
            className="btn btn-secondary ms-2"
            onClick={() => {
              setUpdating(false);
              resetForm();
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="full-tabale">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Selling Price</th>
              <th>Publish Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookList.length > 0 ? (
              bookList.map((book) => (
                <tr key={book._id}>
                  <td>{book.BookName}</td>
                  <td>{book.BookTitle}</td>
                  <td>{book.Author}</td>
                  <td>{book.SellingPrice}</td>
                  <td>{book.PublishDate}</td>

                  <td>
                    <div className="icon">
                      <MdDelete onClick={() => handleDelete(book._id)} />
                      <FaEdit onClick={() => handleEdit(book)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
