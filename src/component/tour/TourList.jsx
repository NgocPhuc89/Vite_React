/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import TourService from "../../services/tourService";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

const TourList = () => {

    const [tourList, setTourList] = useState([]);

    useEffect(() => {
        try {
            async function getAllTour() {
                const tour = await TourService.getAllTour();
                setTourList(tour.data)
            }
            getAllTour();
        } catch (error) {
            console.log(error);
        }

        return () => {

        }
    }, []);

    const deleteTour = async (id, name) => {
        try {
            swal({
                title: "Cảnh Báo!!",
                text: "Bạn Chắc Chắn Muốn Xóa " + "<" + name + ">" + " Khỏi Danh Sách",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((del) => {
                    del ? (TourService.delete(id), swal("Thông Báo", "Xóa Thành Công" + "<" + name + ">" + " Khỏi Danh Sách", "success"),
                        setTourList((preList) => preList.filter((tour) => tour.id != id))) : ''
                })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-danger text-center">Tour List</h1>
            <div className="mb-4">
                <NavLink className="btn btn-primary" to={'/tour/create'} >
                    <i className="fa fa-plus me-2"></i>Create
                </NavLink>
            </div>
            <table className="table table-hover">
                <thead style={{ background: " #aeaeb3" }}>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        tourList.length && tourList.map((tour) => (
                            <tr key={tour.id}>
                                <td>{tour.id}</td>
                                <td>{tour.name}</td>
                                <td>{tour.price}</td>
                                <td>
                                    <td>
                                        <NavLink to={`/tour/edit/${tour.id}`} >
                                            <i role="button" className="fa fa-edit me-3 btn btn-outline-success" />
                                        </NavLink>
                                    </td>
                                    <td>
                                        <i role="button" className="fa fa-trash me-1 btn btn-outline-danger"
                                            onClick={() => deleteTour(tour.id, tour.name)} />
                                    </td>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TourList;