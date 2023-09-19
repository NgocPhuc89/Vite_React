/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import StudentService from "../../services/studentService";
import { NavLink } from "react-router-dom";
import Spinner from "../layout/Spinner";

const StudentList = ({ studentList, setStudentList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [action, setAction] = useState('next');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        try {
            setLoading(true)
            async function getStudent() {
                let response = await StudentService.getStudent(currentPage);
                setStudentList(response.data.data);
                setTotalPage(Math.ceil(
                    Number(response.data.pagination._totalRows) / Number(response.data.pagination._limit)));
                setLoading(false)
            }
            getStudent();

        } catch (error) {

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

    const deleteStudent = async (student, id) => {
        try {
            let confirm = window.confirm("Bạn Chắc Chắn Muốn Xóa " + student + " Khỏi Danh Sách");
            confirm ? (StudentService.deleteStudent(id), alert("Xóa Thành Công"),
                setStudentList((preList) => preList.filter((student) => student.id != id))) : ''
        } catch (error) {

        }
    }

    return (
        loading ? <Spinner /> :
            <div className="container mt-5">
                <h2 className="text-danger text-center mt-4"> Student List</h2>
                <button className="btn btn-sm btn-primary" style={{}}>
                    <NavLink className="nav-link " style={{ color: "white" }} to={'/student/create'}>
                        <i className="fa fa-plus me-2" />
                        Create
                    </NavLink>
                </button>
                <section>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Mark</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentList.map((stu) => (
                                    <tr>
                                        <td>{stu.id}</td>
                                        <td>{stu.name}</td>
                                        <td>{stu.age}</td>
                                        <td>{stu.mark}</td>
                                        <td>{stu.gender}</td>
                                        <td>{stu.city}</td>
                                        <td>
                                            <i role="button" className="fa fa-pen me-3 btn btn-success" />
                                        </td>
                                        <td>
                                            <i role="button" className="fa fa-trash me-1 btn btn-danger"
                                                onClick={() => deleteStudent(stu.name, stu.id)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </section>
                <section>
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
                </section>
            </div >
    )
}



export { StudentList }