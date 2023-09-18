import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const CreateStudent = () => {

    const createSchema = yup.object({

    })

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(createSchema)
    });

    const createStudent = async (value) => {
        console.log(value);
        try {
            const response = await fetch('https://js-post-api.herokuapp.com/api/students', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(value)
            });
            if (response.ok) {
                const data = await response.json();

                console.log(data);
                reset();
            } else {
                throw new Error("Lỗi")
            }
        }
        catch (error) {
            console.error(error);
        }

    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-danger text-center mt-4">Create Student</h2>
                <form onSubmit={handleSubmit(createStudent)}>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Name</label>
                        <input type="text" name="" id="" className="form-control" {...register('name')} />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Age</label>
                        <input type="number" name="" id="" className="form-control" {...register('age')} />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Mark</label>
                        <input type="text" name="" id="" className="form-control"{...register('mark')} />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">City</label>
                        <input type="text" name="" id="" className="form-control"{...register('city')} />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form">Gender</label>
                        <select name="" id="" className="form-control" {...register('gender')}>
                            <option value="male"  >Male</option>
                            <option value="female" >Female</option>
                        </select>
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