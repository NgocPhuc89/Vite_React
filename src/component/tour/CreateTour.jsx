
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { useState } from "react"
import { useForm } from "react-hook-form";
import TourService from "../../services/tourService";
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";

const CreateTour = () => {

    const [create, setCreate] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const back = useNavigate();

    const createTour = async (value) => {
        console.log(value);
        try {
            await TourService.createTour(value);
            setCreate(value);
            reset();
            swal("Chúc Mừng", "Thêm Thông Tin Thành Công", "success");
            back('/tour/list')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="row col-md-4" id="formAddPost">
                <h1 className="text-primary text-center mt-4">Create Tour</h1>
                <form onSubmit={handleSubmit(createTour)}>
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
                        <button type="submit" className="btn btn-success me-2">Create</button>
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

export default CreateTour