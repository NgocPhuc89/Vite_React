/* eslint-disable react/jsx-key */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import StudentService from "../../services/studentService";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import LocationRegionService from "../../services/locationRegionService";


const CreateStudent = () => {
    const [create, setCreate] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [locationRegion, setLocationRegion] = useState({});
    const back = useNavigate();
    const createSchema = yup.object({
        name: yup.string()
            .required("Vui Lòng Nhập Tên")
            .min(5, "Tên Phải Từ 5 Kí Tự ")
            .max(30, "Tên Phải Ít Hơn 30 Kí Tự "),
        age: yup.number()
            .required("Vui Lòng Nhập Tuổi")
            .positive()
            .max(60, "Tuổi Không Được Lớn Hơn 50")
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

    useEffect(() => {
        try {
            async function getALlProvinces() {
                const provinces = await LocationRegionService.getAllProvince();
                setProvinces(provinces.data.results)
            }
            getALlProvinces();
        } catch (error) {

        }
    }, [])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(createSchema)
    });

    const createStudent = async (value) => {
        console.log(value);
        try {
            await StudentService.postStudent(value)
            setCreate(value);
            reset();
            swal("Chúc Mừng", "Thêm Mới Thành Công!!!", "success")
            back("/")
        } catch (error) {

        }
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Create Student</h2>
                <form onSubmit={handleSubmit(createStudent)}>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Name</label>
                        <input type="text" name="" id=""
                            className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('name')} />
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
                        <label className="label-form">Gender</label>
                        <select name="" id="" className="form-control" {...register('gender')}>
                            <option value="male"  >Male</option>
                            <option value="female" >Female</option>
                        </select>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">City</label>
                        <input type="text" name="" id=""
                            className={`${errors?.city?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('city')} />
                        <span className="invalid-feedback">{errors?.city?.message}</span>
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Province</label>
                        <select type="text" name="" id=""
                            className={`${errors?.province?.message ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('city')} >

                            {
                                provinces.length && provinces.map((item) => (
                                    <option value={item.province_name} key={item.province_id}>{item.province_name}</option>
                                ))
                            }

                        </select>
                        <span className="invalid-feedback">{errors?.city?.message}</span>
                    </div>
                    <div className=" mb-3 ">
                        <label className="label-form">Farvorite
                            <div className="container d-flex ">
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="game" id="" value="game" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Game</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="music" id="" value="music" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Music</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="football" id="" value="football" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Football</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="for-check-input me-2" type="checkbox" name="swimming" id="" value="swimming" {...register('favorite')} />
                                        <label className="form-check-label" htmlFor="">Swimming</label>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-danger me-3">Create</button>
                        <button type="button" className="btn btn-success"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateStudent;