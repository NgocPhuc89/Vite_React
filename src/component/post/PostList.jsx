/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import PostService from "../../services/postService";
import { NavLink } from "react-router-dom";

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        try {
            async function getPostList() {
                let respo = await PostService.getAll(page);
                console.log(respo);
                setPostList(respo.data.data);
                setTotalPage(Math.ceil(
                    Number(respo.data.pagination._totalRows) / (respo.data.pagination._limit)
                ))
            }
            getPostList();
        } catch (error) {

        }
        return () => {

        }
    }, [page])

    const first = () => {
        setPage(1);
    }
    const previos = () => {
        page >= 1 ? setPage(page - 1) : "";
    }
    const next = () => {
        page <= totalPage ? setPage(page + 1) : "";
    }
    const last = () => {
        setPage(totalPage);
    }

    return (

        <div className="container">
            <div className="row">
                <h1 className="text-danger text-center mt-4">Post List</h1>
                <div className="d-flex justify-content-between mt-4 mb-4">
                    <div>
                        <NavLink className="btn btn-primary" to={'/post/create'} >
                            <i className="fa fa-plus me-2"></i>Create
                        </NavLink>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary me-1"
                            onClick={first}>First</button>
                        <button type="button" className="btn btn-outline-primary me-1"
                            onClick={previos}>Previos</button>
                        <button type="button" className="btn btn-outline-primary me-1"
                            onClick={next} >Next</button>
                        <button type="button" className="btn btn-outline-primary me-1"
                            onClick={last}> Last</button>
                    </div>

                </div>
                {
                    postList.map((post) => (
                        <section className="col-md-4  mb-3" >
                            <div className="card" style={{ height: "500px" }}>
                                <img onError={(e) => {
                                    e.target.src = "https://picsum.photos/id/805/1368/400"
                                }} className="card-img-top" src={post.imageUrl} alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card=text">{post.description}</p>
                                    <p className="fst-italic">Author : {post.author} </p>
                                </div>
                                <div className="d-flex mb-2">
                                    <button className="btn btn-success ms-3">
                                        <i className="fa fa-edit me-1"></i>Edit</button>
                                    <button className="btn btn-danger ms-3">
                                        <i className="fa fa-trash me-1"></i>Delete</button>
                                </div>
                            </div>
                        </section>
                    ))
                }
            </div>
        </div>
    )
}

export default PostList;