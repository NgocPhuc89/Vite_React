/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import TourService from "../../services/tourService";
import swal from "sweetalert";


const EditTour = () => {
    const { tourId } = useParams();
    const [edit, setEdit] = useState({});
    const back = useNavigate();

    useEffect(() => {
        try {
            async function getById() {
                let respo = await TourService.getById(tourId);
                setEdit(respo.data)
            }
            getById();
        } catch (error) {
            console.log(error);
        }
    }, [tourId])

    const { register, handleSubmit } = useForm({
        values: edit
    });

    const editTour = async (setValue) => {
        try {
            await TourService.editTour(tourId, setValue)
            setEdit(setValue);
            swal("Chúc Mừng", "Chỉnh Sửa Thông Tin Thành Công", "success");
            back('/tour/list')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="row col-md-4" id="formAddPost">
                <h1 className="text-primary text-center mt-4">Edit Tour</h1>
                <form onSubmit={handleSubmit(editTour)}>
                    <div className="form-group mb-3">
                        <label className="label-form" htmlFor=""> Tour Name</label>
                        <input type="text" className="form-control"
                            {...register('name')} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label-form" htmlFor="">Price</label>
                        <input type="number" className="form-control"
                            {...register('price')} />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form" htmlFor="">Description</label>
                        <textarea type="text" className="form-control" style={{ height: "100px" }}
                            {...register('description')} />
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                        <button type="submit" className="btn btn-success me-2">Edit</button>
                        <button type="reset" className="btn btn-danger me-2">Cancel</button>
                        <NavLink className="btn btn-secondary" to={'/tour/list'} >
                            <i className="fa fa-arrow-left"></i>
                            Back
                        </NavLink>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditTour;