import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectAll } from "./SelectAll";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "./Pagination";
import { Footer } from "./Footer";
export const Contacts2 = ({
  limit,
  setLimit,
  searchText,
  contacts,
  setContacts,
  url,
  reload,
  setReload,
  setId,
  handleModal,
}) => {
  console.log("contacts from contacts2", contacts);
  const navigate = useNavigate();
  const loc = useLocation();
  console.log("location from contacts2", loc);
  const { search } = loc;
  const query = QueryString.parse(search);
  const [currentItems, setCurrentItems] = useState([query?.limit]);
  const [showPerPage, setShowPerPage] = useState(limit);
  const [pagination, setPagination] = useState({
    start: query.offset,
    end: showPerPage,
  });
  console.log("per page rec", showPerPage);
  console.log("start from contacts2", pagination.start);
  console.log("end from contacts2", pagination.end);
  console.log("currentItems from contact2", currentItems);
  console.log("limit of contact2 is", query?.limit);
  console.log("query object from contacts2", query);
  console.log("search from contacts2", search);
  console.log("Contacts from contafts2", contacts);
  console.log("searchText from contacts2 is", searchText);
  useEffect(() => {
    // navigate(`/?limit=${query?.limit}&&offset=${query?.offset}`)
    navigate(`/?limit=5&&offset=0`);
    //`${query?.limit} ${query?.offset}`
  }, []);
  //  offset, limit || null
  useEffect(() => {
    setCurrentItems([...contacts.slice(pagination.start, pagination.end)]);
  }, [pagination.start, pagination.end, limit, contacts]);
  useEffect(() => {
    changeUrl();
  }, []);
  const changeUrl = () => {
    navigate({
      pathname: "/",
      search:
        "?" +
        new URLSearchParams({ limit: limit }).toString() +
        "&&" +
        new URLSearchParams({ offset: pagination.start }).toString(),
    });
  };
  const onPageChange = (start, end) => {
    console.log(start, end);
    setPagination({ start: start, end: end });
    navigate({
      pathname: "/",
      search:
        "?" +
        new URLSearchParams({ limit: limit }).toString() +
        "&&" +
        new URLSearchParams({ offset: start }).toString(),
    });
  };
  const handleLimit = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
    setShowPerPage(e.target.value);
    onPageChange(0, e.target.value);
    setNUmberOfButtons(+Math.ceil(contacts.length / showPerPage));
  };
  const deleteContacts = async (id) => {
    const api = await axios.delete(`${url}/${id}`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    setReload(!reload);
  };
  const handleChangeChk = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);
    if (name === "Allselect") {
      let tempUser = currentItems.map((item) => {
        return { ...item, isChecked: checked };
      });
      setCurrentItems(tempUser);
    } else {
      let tempUser = currentItems.map((item) =>
        item?._id === name ? { ...item, isChecked: checked } : item
      );
      console.log(tempUser);
      setCurrentItems(tempUser);
    }
  };
  const handleSubmitchk = (e) => {
    e.preventDefault();
    console.log("ckh pressed");
  };
  const deleteSelected = async (e) => {
    e.preventDefault();
    let newList = [...currentItems];
    const a = currentItems.filter((item) => item?.isChecked === true);
    console.log("checked array", a);
    if (window.confirm("Do you really want to delete seleted users?")) {
      for (let i = 0; i < a.length; i++) {
        const result = await axios.delete(`${url}/${a[i]._id}`);
        const ind = newList.findIndex((el) => el._id === a[i]._id);
        newList.splice(ind, 1);
      }
      setCurrentItems(newList);
    }
  };
  return (<>
   <div className="wrapper" style={{height:"100vh"}}>
      <div className="main">
        <div className="   text-end  mb-4">
          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Delete selected users "
            className="btn btn-md btn-light  "
            style={{ width: "49px" }}
            onClick={(e) => deleteSelected(e)}
          >
            <FontAwesomeIcon icon={faUserMinus} className="me-2" />
            {/* Delete Users */}
          </button>
        </div>
        <div className="container-fluid mt-5 p-0">
          <div className="card">
            <div className="card-header">User List</div>
            <div className="card-body table-responsive ">
              <form onSubmit={handleSubmitchk}>
                <table
                  className="table table-bordered table-striped   w-100  "
                  style={{ overflow: "auto" }}
                >
                  <thead className="table-dark">
                    <tr>
                      <th
                        data-bs-toggle="tooltip"
                        title="select all records"
                        className="text-white text-center"
                      >
                        {" "}
                        <SelectAll
                          list={currentItems}
                          handleChange={handleChangeChk}
                        />
                      </th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Image</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((el) => (
                      <tr key={el?._id}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            name={el?._id}
                            checked={el?.isChecked || false}
                            onChange={handleChangeChk}
                          />
                        </td>
                        <td>{el?.name}</td>
                        <td>{el?.phone}</td>
                        <td className="text-center">
                          <img
                            src={el?.image}
                            alt="ll"
                            style={{ width: "40px", height: "40px" }}
                          />
                        </td>
                        <td className="d-flex flex-column justify-content-center">
                          <div className="w-5 text-center ">
                            <button
                              className="btn btn-sm    mb-3"
                              onClick={() => {
                                setId(el._id), handleModal();
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPen}
                                className="me-2"
                                style={{ color: "blue" }}
                              />
                            </button>
                          </div>
                          <div
                            className="text-center "
                            //  style={{ width: "150px" }}
                          >
                            <button
                              className="btn btn-sm  "
                              onClick={() => deleteContacts(el._id)}
                              style={{ width: "100px" }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "black" }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5">
                  <ul
                    style={{ listStyleType: "none" }}
                    className="d-flex
                      flex-row justify-content-round align-items-center "
                  >
                    <li className="mx-4 ">
                      <select value={limit} name="limit" onChange={handleLimit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="5">5</option>
                        <option value="25">25</option>
                      </select>
                    </li>
                    <li>
                      <Pagination
                        showPerPage={showPerPage}
                        onPageChange={onPageChange}
                        total={contacts.length}
                        limit={limit}
                      />
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
       
      </div>
    </div>
     <Footer />
  </>
   
  );
};
