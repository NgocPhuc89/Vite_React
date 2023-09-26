/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import StudentService from "../../services/studentService";
import { NavLink, useLocation } from "react-router-dom";
import Spinner from "../layout/Spinner";
import swal from 'sweetalert';

const StudentList = () => {
    const id = useLocation().state?.id;
    const page = useLocation().state?.page;
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [city, setCity] = useState("");
    const [totalPage, setTotalPage] = useState(0);
    const [action, setAction] = useState('next');
    const [loading, setLoading] = useState(false)
    const [background, setBackground] = useState("pink");

    useEffect(() => {
        try {
            setLoading(true)
            async function getStudent() {
                let response;
                city !== "" ? response = await StudentService.getStudentSearch(currentPage, city)
                    : response = await StudentService.getStudents(currentPage)

                setStudentList(response.data.data);
                setTotalPage(Math.ceil(
                    Number(response.data.pagination._totalRows) / Number(response.data.pagination._limit)));
                setLoading(false)
                console.log(studentList);
            }
            getStudent();
        } catch (error) {

        }
        return () => {

        }
    }, [currentPage, city])

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
            swal({
                title: "Cảnh Báo!!",
                text: "Bạn Chắc Chắn Muốn Xóa " + "<" + student + ">" + " Khỏi Danh Sách",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((del) => {
                    del ? (StudentService.deleteStudent(id), swal("Thông Báo", "Xóa Thành Công" + "<" + student + ">" + " Khỏi Danh Sách", "success"),
                        setStudentList((preList) => preList.filter((student) => student.id != id))) : ''
                })

        } catch (error) {

        }
    }

    const listCity = [...new Set(studentList.map((str) => str.city))];

    const searchByCity = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setBackground("white");
        }, 1000 * 3)

        return () => clearTimeout(timer)
    }, [])

    //cuộn xuống theo id và page
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }
    setTimeout(() => {
        if (id && studentList.length > 0) {
            scrollToElement(id);
        }
    }, 1000 * 1)

    return (
        loading ? <Spinner /> :
            <div className="container mt-5">
                <h1 className="text-danger text-center mt-4"> Student List</h1>
                <button className="btn btn-sm btn-primary mt-4" style={{}}>
                    <NavLink className="nav-link " style={{ color: "white" }} to={'/student/create'}>
                        <i className="fa fa-plus me-2" />
                        Create
                    </NavLink>
                </button>
                <div className="d-flex mt-4">
                    <h5>City</h5>
                    <select className="form-control ms-4" style={{ width: "250px" }} onChange={(e) => searchByCity(e)}>
                        <option value="" key="">--chọn--</option>
                        {
                            listCity.map((city) => {
                                return <option value={city}>{city}</option>
                            })
                        }
                    </select>
                </div>

                <section className="mt-4">

                    <table className="table table-hover">
                        <thead>
                            <tr className="tr">
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Mark</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>District</th>
                                <th>Ward</th>
                                <th>Favorite</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentList.map((stu) => (
                                    <tr key={stu.id} id={stu.id} style={{ background: stu.id === id ? background : "white" }}>
                                        <td>{stu.id}</td>
                                        <td>{stu.name}</td>
                                        <td>{stu.age}</td>
                                        <td>{stu.mark}</td>
                                        <td>{stu.gender}</td>
                                        <td>{stu.city}</td>
                                        <td>{stu.locationRegion?.provinceName}</td>
                                        <td>{stu.locationRegion?.districtName}</td>
                                        <td>{stu.locationRegion?.wardName}</td>
                                        <td>{stu.favorite?.join(" , ")}</td>
                                        <td>
                                            <NavLink to={`/student/edit/${stu.id}/${currentPage}`}>
                                                <i role="button" className="fa fa-edit me-3 btn btn-outline-success" />
                                            </NavLink>

                                        </td>
                                        <td>
                                            <i role="button" className="fa fa-trash me-1 btn btn-outline-danger"
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
                                onClick={first}>First</button>
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