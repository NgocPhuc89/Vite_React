/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import CreateStudent from "./CreateStudent";

const StudentList = () => {
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [action, setAction] = useState('next')
    const [create, setCreate] = useState(false);
    useEffect(() => {
        async function getStudent() {
            let response = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`);
            let student = await response.json();
            setStudentList(student.data);
            setTotalPage(Math.ceil(Number(student.pagination._totalRows) / Number(student.pagination._limit)));
            console.log(student);
        }
        getStudent();
        return () => {

        }
    }, [currentPage])

    const nextPage = () => {
        currentPage < totalPage ? setCurrentPage(currentPage + 1)(setAction('next')) : ''
    }
    const prevPage = () => {
        currentPage > 1 ? setCurrentPage(currentPage - 1)(setAction('prev')) : ''
    }
    const first = () => {
        setCurrentPage(1);
        setAction('first');
    }
    const last = () => {
        setCurrentPage(totalPage);
        setAction('last')
    }

    const deleteStudent = async (student, index) => {
        let confirm = window.confirm("Bạn Chắc Chắn Muốn Xóa " + student + " Khỏi Danh Sách");
        confirm ? (await fetch(`https://js-post-api.herokuapp.com/api/students/${index}`, {
            method: "DELETE"
        }),
            setStudentList((preList) => preList.filter((student) => student.id != index))) : ''
    }


    return (
        <>
            <button className="btn btn-primary ms-3" onClick={() => setCreate(!create)}>
                Create Student</button>
            {create && <CreateStudent />}
            <div className="container mt-5">
                <div>
                    <h2 className="text-danger text-center">Student List</h2>
                    <div className="d-flex justify-content-between mb-2">
                        <div>
                            <button type="button" className={`${currentPage == 1 ? 'btn btn-outline-primary me-1' : 'btn btn-outline-primary me-1'} ${action == 'first' ? 'active' : ''}`}
                                onClick={first}>
                                First</button>
                            <button type="button" className={`${currentPage <= 1 ? 'btn btn-outline-primary me-1 disabled ' : 'btn btn-outline-primary me-1'} ${action == 'prev' ? 'active' : ''}`}
                                onClick={prevPage}>Prev</button>
                            <button type="button" className={`${currentPage >= totalPage ? 'btn btn-outline-primary me-1 disabled ' : 'btn btn-outline-primary me-1'} ${action == 'next' ? 'active' : ''}`}
                                onClick={nextPage}>Next</button>
                            <button type="button" className={`${currentPage == totalPage ? 'btn btn-outline-primary' : ' btn btn-outline-primary'} ${action == 'last' ? 'active' : ''} `}
                                onClick={last}>
                                Last</button>
                        </div>
                    </div>
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
                                        <i role="button" className="fa fa-trash me-1 btn btn-danger"
                                            onClick={() => deleteStudent(student.name, student.id)} />
                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div >
        </>
    )
}



export { StudentList }