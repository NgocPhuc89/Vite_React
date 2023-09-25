/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */

import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import StudentService from "../../services/studentService";
import swal from "sweetalert";


const EditStudent = () => {

    const { studentId, page } = useParams();
    const [update, setUpdate] = useState({});
    const back = useNavigate();
    useEffect(() => {
        try {
            async function getStu() {
                let respo = await StudentService.getStudent(studentId);
                setUpdate(respo.data)
            }
            getStu();
        } catch (error) {
            console.log(error);
        }
    }, [studentId])
    const editSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự "),
        // .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
        age: yup.number()
            .required("Vui Lòng Nhập Tuổi")
            .positive()
            .max(50, "Tuổi Không Được Lớn Hơn 50")
            .typeError("Vui Lòng Nhập Tuổi"),
        city: yup.string()
            .required("Vui Lòng Nhập Thành Phố")
            .max(30, "Thành Phố Phải Ít Hơn 30 Kí Tự "),
        mark: yup.mixed()
            .required("Vui Lòng Nhập Điểm")
            .typeError("Vui Lòng Nhập Điểm")
            .test("valid-mark", " Điểm Là Số nguyên hoặc Số Thập Phân", function (value) {
                if (value === undefined || value === null) return false;
                return /^-?\d+(\.\d{1})?$/.test(value);
            })
            .test("valid-range", "Điểm Phải Từ 0 - 10", function (value) {
                if (value === undefined || value === null) return false;
                const parsedValue = parseFloat(value);
                return parsedValue >= 0 && parsedValue <= 10;
            })
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(editSchema),
        values: update
    });
    console.log(update);


    const editStudent = async (setValue) => {
        try {
            await StudentService.putStudent(studentId, setValue);
            setUpdate(setValue)
            swal("Chúc Mừng", "Chỉnh Sửa Thông Tin Thành Công", "success");
            back('/', {
                state: {
                    page,
                    id: studentId
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Edit Student</h2>
                <form onSubmit={handleSubmit(editStudent)}>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Name</label>
                        <input type="text" name="" id=""
                            className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('name')}
                        />
                        <span className="invalid-feedback" >{errors?.name?.message}</span>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Age</label>
                        <input type="number" name="" id=""
                            className={`${errors?.age?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('age')} />
                        <span className="invalid-feedback">{errors?.age?.message}</span>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Mark</label>
                        <input type="text" name="" id=""
                            className={`${errors?.mark?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('mark')} />
                        <span className="invalid-feedback">{errors?.mark?.message}</span>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">City</label>
                        <input type="text" name="" id=""
                            className={`${errors?.city?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('city')} />
                        <span className="invalid-feedback">{errors?.city?.message}</span>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Gender</label>
                        <select name="" id="" className="form-control" {...register('gender')}>
                            <option value="male"  >Male</option>
                            <option value="female" >Female</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-danger me-3">Update</button>
                        <button type="button" className="btn btn-success"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent;