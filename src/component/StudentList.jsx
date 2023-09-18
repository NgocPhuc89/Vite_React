/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"

const StudentList = () => {
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        async function getStudent() {
            let response = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`);
            let student = await response.json();
            setStudentList(student.data);
            setTotalPage(Math.ceil(Number(student.pagination._totalRows) / Number(student.pagination._limit)))
        }
        getStudent();
        return () => {

        }
    }, [currentPage])

    const nextPage = () => {
        currentPage < totalPage ? setCurrentPage(currentPage + 1) : ''
    }
    const prevPage = () => {
        currentPage > 1 ? setCurrentPage(currentPage - 1) : ''
    }

    return (
        <div className="container">
            <h2 className="text-danger">Student List</h2>
            <div>
                <nav className="navigation">
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#">Previous</a>
                        </li>
                    </ul>
                </nav>
                <button type="button" className="btn btn-outline-primary me-1">First</button>
                <button type="button" className="btn btn-outline-primary me-1"
                    onClick={prevPage}>Prev</button>
                <button type="button" className="btn btn-outline-primary me-1"
                    onClick={nextPage}>Next</button>
                <button type="button" className="btn btn-outline-primary">Last</button>
            </div>
            <div className="row">
                {
                    studentList.map((student) => (
                        <div className="col-md-4 mb-3">
                            <div id="cardbody" className="card">
                                <div className="card-body">
                                    <h5 id="name" className="card-title text-primary">{student.name}</h5>
                                    <p className="cart-text">#  {student.id}</p>
                                    <p className="cart-text">Age : {student.age}</p>
                                    <p className="cart-text">Mark : {student.mark}</p>
                                    <p className="cart-text">Gender : {student.gender}</p>
                                    <p className="fst-italic">City : {student.city}</p>
                                    <i role="button" className="fa fa-pen me-3 btn btn-success" />
                                    <i role="button" className="fa fa-trash me-1 btn btn-danger" />
                                </div>
                                <div>
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}


export default StudentList