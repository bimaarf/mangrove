import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlogUpdate } from "./Modal/BlogUpdate";
import { DeleteBlog } from "./Modal/BlogDelete";
import { useNavigate } from "react-router-dom";

export const BlogAdmin = ({ getBlog, getCategory, getBlogAPI }) => {
  const navRedirect = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="table table-auto border mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Gambar</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        {getBlog &&
          getBlog.map((item, key) => (
            <tbody key={key}>
              <tr>
                <td>{key + 1}</td>
                <td>
                  {item.image ? (
                    <img
                      className="rounded object-cover shadow p-0.5 border"
                      width={100}
                      height={70}
                      src={
                        process.env.REACT_APP_API +
                        "Images/Blog/" +
                        JSON.parse(item.image)[0]
                      }
                      alt=""
                    />
                  ) : (
                    <p className="text-graya-700">Tidak ada</p>
                  )}
                </td>
                <td className="whitespace-pre-wrap max-w-md">
                  {item.title.length > 50
                    ? item.title.substring(0, 50) + "..."
                    : item.title}
                </td>
                <td>
                  <p className="px-1 py-0.5 bg-green-700 text-white text-xs rounded text-center">
                    {item.category_name}
                  </p>
                </td>
                <td>
                  <div className="flex justify-start items-center gap-2">
                    <BlogUpdate
                      getBlogAPI={getBlogAPI}
                      getCategory={getCategory}
                      item={item}
                    />
                    <DeleteBlog item={item} getBlogAPI={getBlogAPI} />
                    <button
                      onClick={() => navRedirect(`/blog/v/:${item.slug}`)}
                      className="fa fa-eye bg-cyan-600 hover:bg-cyan-700 text-white duration-300 px-3 py-1 rounded"></button>
                    <label
                      htmlFor={`update-blog${item.id}`}
                      className="fa fa-pencil bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white duration-300 px-3 py-1 rounded"></label>
                    <label
                      htmlFor={`delete-blog${item.id}`}
                      className="fa fa-trash bg-red-600 cursor-pointer hover:bg-red-700 text-white duration-300 px-3 py-1 rounded"></label>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};
