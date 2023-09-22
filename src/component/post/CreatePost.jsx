
const CreatePost = () => {
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="row col-md-4" id="formAddPost">
                <h1 className="text-primary text-center mt-4">Create Post</h1>
                <form action="">
                    <div className="form-group mb-3">
                        <label className="label-form" htmlFor="">Image</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label-form" htmlFor="">Title</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-3 ">
                        <label className="label-form" htmlFor="">Description</label>
                        <textarea type="text" className="form-control" style={{ height: "100px" }} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label-form" htmlFor="">Author</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                        <button type="submit" className="btn btn-success me-2">Create</button>
                        <button type="reset" className="btn btn-danger ms-2">Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreatePost